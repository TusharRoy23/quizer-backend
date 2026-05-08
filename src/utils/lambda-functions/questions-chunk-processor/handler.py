import json
import random
import string
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel
from typing import Optional

# ── Schema ───────────────────────────────────────────────────────────────────

class Question(BaseModel):
    question: str
    answer: list[int]
    options: list[str]
    question_type: str
    topic: Optional[str] = None
    sub_topic: Optional[str] = None

class QuizSchema(BaseModel):
    questions: list[Question]

# ── Helper ───────────────────────────────────────────────────────────────────

def generate_uniqueness_key() -> str:
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=6))

def get_llm_model():
    try:
        api_key = os.environ.get("OPENAI_API_KEY")

        if not api_key:
            raise EnvironmentError("OPENAI_API_KEY is not set in Lambda environment variables")

        llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.6,  # some creativity, but not too much
            api_key=api_key,
            max_retries=2        # auto retry on transient failures
        )
        # print(f"api_key len {len(api_key)}")
        # print(f"llm: {llm}")

        return llm.with_structured_output(QuizSchema)
    except Exception as e:
        raise RuntimeError(f"Unexpected error initializing LLM: {str(e)}")
    
# ── Handler ───────────────────────────────────────────────────────────────────

def handler(event, context):
    try:
        # Validate required fields exist in event payload
        required_fields = [
            "question_count", "topicNames", "difficultyLevel",
            "departmentName", "assessment_type",
            "scenarioCount", "misconceptionCount", "advancedCount"
        ]
        missing = [f for f in required_fields if f not in event]
        if missing:
            raise ValueError(f"Missing required fields in payload: {missing}")

        # Unpack
        question_count      = event["question_count"]
        topic_names         = event["topicNames"]
        difficulty_level    = event["difficultyLevel"]
        department_name     = event["departmentName"]
        assessment_type     = event["assessment_type"]
        scenario_count      = event["scenarioCount"]
        misconception_count = event["misconceptionCount"]
        advanced_count      = event["advancedCount"]
        
        # get_llm_model()

        # return { "success": True, "message": "Lambda is alive" }

        uniqueness_key = generate_uniqueness_key()

        # Initialize LLM inside handler — any failure is catchable here
        try:
            model_with_schema = get_llm_model()
        except EnvironmentError as e:
            raise EnvironmentError(f"LLM initialization failed: {str(e)}")
        except Exception as e:
            raise RuntimeError(f"Unexpected error initializing LLM: {str(e)}")

        # Build prompt
        prompt_template = ChatPromptTemplate.from_messages([
            (
                "system",
                """You are an expert quiz generator.
                GENERATION ID: {uniquenessKey} - Use this to create COMPLETELY NEW questions.
                IMPORTANT: For each call with new {uniquenessKey}, generate 100% novel questions.
                Never reuse phrasing, scenarios, or examples from prior generations.

                IMPORTANT DISTINCTION:
                - If the assessment type is "GIA" (General Intelligence Assessment), you MUST generate
                cognitive ability test questions.
                - GIA questions test reasoning ability, NOT domain knowledge.
                - NEVER explain what GIA is.
                - NEVER ask questions about how GIA is conducted.
                - NEVER generate HR, psychology, or theory questions about intelligence.

                FOR GIA QUESTIONS:
                - Questions must be self-contained and domain-neutral
                - Allowed GIA categories only:
                    - Numerical Reasoning
                    - Logical Reasoning
                    - Abstract / Pattern Recognition
                    - Verbal Reasoning
                    - Attention & Rule-Based Reasoning
                - Each question must test problem-solving, inference, or pattern detection
                - Assume the test-taker has no prior subject knowledge
                - Prefer time-pressure style questions

                GENERAL RULES:
                - Generate exactly {question_count} questions
                - Every question MUST belong to exactly ONE topic
                - Do NOT mix topics in a single question
                - For CHOICE questions: exactly 4 options, single answer [0-3]
                - For MULTIPLE_CHOICE questions: exactly 4 options, multiple answers
                - Difficulty range is 0-100 only
                - Topic value MUST be one of: {topicNames}
                - Return valid JSON only, no additional text
                """
            ),
            (
                "human",
                """
                Assessment Type: {assessmentType}
                Generate {question_count} questions.
                DEPARTMENT: {departmentName}
                TOPICS: {topicNames}
                DIFFICULTY LEVEL: {difficulty_level}
                Question distribution:
                - {scenarioCount} scenario-based
                - {misconceptionCount} trap / misleading-option questions
                - {advancedCount} advanced reasoning questions
                - Remaining: mixed reasoning formats
                Ensure questions are novel and suitable for pre-employment assessment
                """
            )
        ])

        # LLM call — most likely failure point
        try:
            chain = prompt_template | model_with_schema
            response = chain.invoke({
                "question_count":     question_count,
                "difficulty_level":   difficulty_level,
                "topicNames":         topic_names,
                "departmentName":     department_name,
                "uniquenessKey":      uniqueness_key,
                "scenarioCount":      scenario_count,
                "misconceptionCount": misconception_count,
                "advancedCount":      advanced_count,
                "assessmentType":     assessment_type,
            })
        except Exception as e:
            raise RuntimeError(f"LLM call failed: {str(e)}")

        # Validate response has questions
        if not response or not response.questions:
            raise ValueError("LLM returned empty questions")

        return {
            "success": True,
            "questions": [
                {
                    "question":      q.question,
                    "answer":        q.answer if q.answer else [0],
                    "options":       q.options if q.options else [],
                    "question_type": q.question_type,
                    "topic":         q.topic,
                    "sub_topic":     q.sub_topic,
                    "uuid":          ""
                }
                for q in response.questions
            ]
        }

    except EnvironmentError as e:
        # Missing env vars — don't retry, it will keep failing
        return { "success": False, "error": "CONFIGURATION_ERROR", "message": str(e) }

    except ValueError as e:
        # Bad payload or empty response — don't retry
        return { "success": False, "error": "VALIDATION_ERROR", "message": str(e) }

    except RuntimeError as e:
        # LLM call failed — transient, NestJS can retry
        return { "success": False, "error": "LLM_ERROR", "message": str(e) }

    except Exception as e:
        # Catch-all unexpected errors
        return { "success": False, "error": "UNKNOWN_ERROR", "message": str(e) }