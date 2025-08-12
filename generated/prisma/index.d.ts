
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model department
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type department = $Result.DefaultSelection<Prisma.$departmentPayload>
/**
 * Model participant
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type participant = $Result.DefaultSelection<Prisma.$participantPayload>
/**
 * Model topic
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type topic = $Result.DefaultSelection<Prisma.$topicPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model question_log
 * 
 */
export type question_log = $Result.DefaultSelection<Prisma.$question_logPayload>
/**
 * Model question_log_topic
 * 
 */
export type question_log_topic = $Result.DefaultSelection<Prisma.$question_log_topicPayload>
/**
 * Model question_log_question
 * 
 */
export type question_log_question = $Result.DefaultSelection<Prisma.$question_log_questionPayload>
/**
 * Model question_keyword
 * 
 */
export type question_keyword = $Result.DefaultSelection<Prisma.$question_keywordPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const QuestionType: {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  CHOICE: 'CHOICE'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]

}

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Departments
 * const departments = await prisma.department.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Departments
   * const departments = await prisma.department.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.department`: Exposes CRUD operations for the **department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.departmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participant`: Exposes CRUD operations for the **participant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participants
    * const participants = await prisma.participant.findMany()
    * ```
    */
  get participant(): Prisma.participantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.topic`: Exposes CRUD operations for the **topic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Topics
    * const topics = await prisma.topic.findMany()
    * ```
    */
  get topic(): Prisma.topicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question_log`: Exposes CRUD operations for the **question_log** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Question_logs
    * const question_logs = await prisma.question_log.findMany()
    * ```
    */
  get question_log(): Prisma.question_logDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question_log_topic`: Exposes CRUD operations for the **question_log_topic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Question_log_topics
    * const question_log_topics = await prisma.question_log_topic.findMany()
    * ```
    */
  get question_log_topic(): Prisma.question_log_topicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question_log_question`: Exposes CRUD operations for the **question_log_question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Question_log_questions
    * const question_log_questions = await prisma.question_log_question.findMany()
    * ```
    */
  get question_log_question(): Prisma.question_log_questionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question_keyword`: Exposes CRUD operations for the **question_keyword** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Question_keywords
    * const question_keywords = await prisma.question_keyword.findMany()
    * ```
    */
  get question_keyword(): Prisma.question_keywordDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    department: 'department',
    participant: 'participant',
    topic: 'topic',
    user: 'user',
    question_log: 'question_log',
    question_log_topic: 'question_log_topic',
    question_log_question: 'question_log_question',
    question_keyword: 'question_keyword'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "department" | "participant" | "topic" | "user" | "question_log" | "question_log_topic" | "question_log_question" | "question_keyword"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      department: {
        payload: Prisma.$departmentPayload<ExtArgs>
        fields: Prisma.departmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.departmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.departmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          findFirst: {
            args: Prisma.departmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.departmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          findMany: {
            args: Prisma.departmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>[]
          }
          create: {
            args: Prisma.departmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          createMany: {
            args: Prisma.departmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.departmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>[]
          }
          delete: {
            args: Prisma.departmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          update: {
            args: Prisma.departmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          deleteMany: {
            args: Prisma.departmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.departmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.departmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>[]
          }
          upsert: {
            args: Prisma.departmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$departmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.departmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.departmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      participant: {
        payload: Prisma.$participantPayload<ExtArgs>
        fields: Prisma.participantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.participantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.participantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          findFirst: {
            args: Prisma.participantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.participantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          findMany: {
            args: Prisma.participantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          create: {
            args: Prisma.participantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          createMany: {
            args: Prisma.participantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.participantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          delete: {
            args: Prisma.participantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          update: {
            args: Prisma.participantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          deleteMany: {
            args: Prisma.participantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.participantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.participantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>[]
          }
          upsert: {
            args: Prisma.participantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$participantPayload>
          }
          aggregate: {
            args: Prisma.ParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipant>
          }
          groupBy: {
            args: Prisma.participantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.participantCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipantCountAggregateOutputType> | number
          }
        }
      }
      topic: {
        payload: Prisma.$topicPayload<ExtArgs>
        fields: Prisma.topicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.topicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.topicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          findFirst: {
            args: Prisma.topicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.topicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          findMany: {
            args: Prisma.topicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>[]
          }
          create: {
            args: Prisma.topicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          createMany: {
            args: Prisma.topicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.topicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>[]
          }
          delete: {
            args: Prisma.topicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          update: {
            args: Prisma.topicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          deleteMany: {
            args: Prisma.topicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.topicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.topicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>[]
          }
          upsert: {
            args: Prisma.topicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$topicPayload>
          }
          aggregate: {
            args: Prisma.TopicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTopic>
          }
          groupBy: {
            args: Prisma.topicGroupByArgs<ExtArgs>
            result: $Utils.Optional<TopicGroupByOutputType>[]
          }
          count: {
            args: Prisma.topicCountArgs<ExtArgs>
            result: $Utils.Optional<TopicCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      question_log: {
        payload: Prisma.$question_logPayload<ExtArgs>
        fields: Prisma.question_logFieldRefs
        operations: {
          findUnique: {
            args: Prisma.question_logFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.question_logFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          findFirst: {
            args: Prisma.question_logFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.question_logFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          findMany: {
            args: Prisma.question_logFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>[]
          }
          create: {
            args: Prisma.question_logCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          createMany: {
            args: Prisma.question_logCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.question_logCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>[]
          }
          delete: {
            args: Prisma.question_logDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          update: {
            args: Prisma.question_logUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          deleteMany: {
            args: Prisma.question_logDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.question_logUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.question_logUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>[]
          }
          upsert: {
            args: Prisma.question_logUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_logPayload>
          }
          aggregate: {
            args: Prisma.Question_logAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion_log>
          }
          groupBy: {
            args: Prisma.question_logGroupByArgs<ExtArgs>
            result: $Utils.Optional<Question_logGroupByOutputType>[]
          }
          count: {
            args: Prisma.question_logCountArgs<ExtArgs>
            result: $Utils.Optional<Question_logCountAggregateOutputType> | number
          }
        }
      }
      question_log_topic: {
        payload: Prisma.$question_log_topicPayload<ExtArgs>
        fields: Prisma.question_log_topicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.question_log_topicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.question_log_topicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          findFirst: {
            args: Prisma.question_log_topicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.question_log_topicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          findMany: {
            args: Prisma.question_log_topicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>[]
          }
          create: {
            args: Prisma.question_log_topicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          createMany: {
            args: Prisma.question_log_topicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.question_log_topicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>[]
          }
          delete: {
            args: Prisma.question_log_topicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          update: {
            args: Prisma.question_log_topicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          deleteMany: {
            args: Prisma.question_log_topicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.question_log_topicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.question_log_topicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>[]
          }
          upsert: {
            args: Prisma.question_log_topicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_topicPayload>
          }
          aggregate: {
            args: Prisma.Question_log_topicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion_log_topic>
          }
          groupBy: {
            args: Prisma.question_log_topicGroupByArgs<ExtArgs>
            result: $Utils.Optional<Question_log_topicGroupByOutputType>[]
          }
          count: {
            args: Prisma.question_log_topicCountArgs<ExtArgs>
            result: $Utils.Optional<Question_log_topicCountAggregateOutputType> | number
          }
        }
      }
      question_log_question: {
        payload: Prisma.$question_log_questionPayload<ExtArgs>
        fields: Prisma.question_log_questionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.question_log_questionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.question_log_questionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          findFirst: {
            args: Prisma.question_log_questionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.question_log_questionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          findMany: {
            args: Prisma.question_log_questionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>[]
          }
          create: {
            args: Prisma.question_log_questionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          createMany: {
            args: Prisma.question_log_questionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.question_log_questionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>[]
          }
          delete: {
            args: Prisma.question_log_questionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          update: {
            args: Prisma.question_log_questionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          deleteMany: {
            args: Prisma.question_log_questionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.question_log_questionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.question_log_questionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>[]
          }
          upsert: {
            args: Prisma.question_log_questionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_log_questionPayload>
          }
          aggregate: {
            args: Prisma.Question_log_questionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion_log_question>
          }
          groupBy: {
            args: Prisma.question_log_questionGroupByArgs<ExtArgs>
            result: $Utils.Optional<Question_log_questionGroupByOutputType>[]
          }
          count: {
            args: Prisma.question_log_questionCountArgs<ExtArgs>
            result: $Utils.Optional<Question_log_questionCountAggregateOutputType> | number
          }
        }
      }
      question_keyword: {
        payload: Prisma.$question_keywordPayload<ExtArgs>
        fields: Prisma.question_keywordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.question_keywordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.question_keywordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          findFirst: {
            args: Prisma.question_keywordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.question_keywordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          findMany: {
            args: Prisma.question_keywordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>[]
          }
          create: {
            args: Prisma.question_keywordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          createMany: {
            args: Prisma.question_keywordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.question_keywordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>[]
          }
          delete: {
            args: Prisma.question_keywordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          update: {
            args: Prisma.question_keywordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          deleteMany: {
            args: Prisma.question_keywordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.question_keywordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.question_keywordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>[]
          }
          upsert: {
            args: Prisma.question_keywordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$question_keywordPayload>
          }
          aggregate: {
            args: Prisma.Question_keywordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion_keyword>
          }
          groupBy: {
            args: Prisma.question_keywordGroupByArgs<ExtArgs>
            result: $Utils.Optional<Question_keywordGroupByOutputType>[]
          }
          count: {
            args: Prisma.question_keywordCountArgs<ExtArgs>
            result: $Utils.Optional<Question_keywordCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    department?: departmentOmit
    participant?: participantOmit
    topic?: topicOmit
    user?: userOmit
    question_log?: question_logOmit
    question_log_topic?: question_log_topicOmit
    question_log_question?: question_log_questionOmit
    question_keyword?: question_keywordOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    topic_topic_departmentTodepartment: number
    question_log_question_department: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic_topic_departmentTodepartment?: boolean | DepartmentCountOutputTypeCountTopic_topic_departmentTodepartmentArgs
    question_log_question_department?: boolean | DepartmentCountOutputTypeCountQuestion_log_question_departmentArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountTopic_topic_departmentTodepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: topicWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountQuestion_log_question_departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_logWhereInput
  }


  /**
   * Count Type ParticipantCountOutputType
   */

  export type ParticipantCountOutputType = {
    question_log: number
  }

  export type ParticipantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | ParticipantCountOutputTypeCountQuestion_logArgs
  }

  // Custom InputTypes
  /**
   * ParticipantCountOutputType without action
   */
  export type ParticipantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantCountOutputType
     */
    select?: ParticipantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParticipantCountOutputType without action
   */
  export type ParticipantCountOutputTypeCountQuestion_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_logWhereInput
  }


  /**
   * Count Type TopicCountOutputType
   */

  export type TopicCountOutputType = {
    question_logs: number
  }

  export type TopicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_logs?: boolean | TopicCountOutputTypeCountQuestion_logsArgs
  }

  // Custom InputTypes
  /**
   * TopicCountOutputType without action
   */
  export type TopicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicCountOutputType
     */
    select?: TopicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TopicCountOutputType without action
   */
  export type TopicCountOutputTypeCountQuestion_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_log_topicWhereInput
  }


  /**
   * Count Type Question_logCountOutputType
   */

  export type Question_logCountOutputType = {
    topics: number
    question_log_question: number
  }

  export type Question_logCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topics?: boolean | Question_logCountOutputTypeCountTopicsArgs
    question_log_question?: boolean | Question_logCountOutputTypeCountQuestion_log_questionArgs
  }

  // Custom InputTypes
  /**
   * Question_logCountOutputType without action
   */
  export type Question_logCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_logCountOutputType
     */
    select?: Question_logCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Question_logCountOutputType without action
   */
  export type Question_logCountOutputTypeCountTopicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_log_topicWhereInput
  }

  /**
   * Question_logCountOutputType without action
   */
  export type Question_logCountOutputTypeCountQuestion_log_questionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_log_questionWhereInput
  }


  /**
   * Count Type Question_log_questionCountOutputType
   */

  export type Question_log_questionCountOutputType = {
    question_keyword: number
  }

  export type Question_log_questionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_keyword?: boolean | Question_log_questionCountOutputTypeCountQuestion_keywordArgs
  }

  // Custom InputTypes
  /**
   * Question_log_questionCountOutputType without action
   */
  export type Question_log_questionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question_log_questionCountOutputType
     */
    select?: Question_log_questionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Question_log_questionCountOutputType without action
   */
  export type Question_log_questionCountOutputTypeCountQuestion_keywordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_keywordWhereInput
  }


  /**
   * Models
   */

  /**
   * Model department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    id: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    id: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    name: string | null
    uuid: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    name: string | null
    uuid: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    uuid: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    id?: true
  }

  export type DepartmentSumAggregateInputType = {
    id?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    uuid?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    uuid?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    uuid?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which department to aggregate.
     */
    where?: departmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentOrderByWithRelationInput | departmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: departmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type departmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: departmentWhereInput
    orderBy?: departmentOrderByWithAggregationInput | departmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: departmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: number
    created_at: Date
    name: string | null
    uuid: string | null
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends departmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type departmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    uuid?: boolean
    topic_topic_departmentTodepartment?: boolean | department$topic_topic_departmentTodepartmentArgs<ExtArgs>
    question_log_question_department?: boolean | department$question_log_question_departmentArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type departmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["department"]>

  export type departmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["department"]>

  export type departmentSelectScalar = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    uuid?: boolean
  }

  export type departmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "name" | "uuid", ExtArgs["result"]["department"]>
  export type departmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    topic_topic_departmentTodepartment?: boolean | department$topic_topic_departmentTodepartmentArgs<ExtArgs>
    question_log_question_department?: boolean | department$question_log_question_departmentArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type departmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type departmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $departmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "department"
    objects: {
      topic_topic_departmentTodepartment: Prisma.$topicPayload<ExtArgs>[]
      question_log_question_department: Prisma.$question_logPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      name: string | null
      uuid: string | null
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type departmentGetPayload<S extends boolean | null | undefined | departmentDefaultArgs> = $Result.GetResult<Prisma.$departmentPayload, S>

  type departmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<departmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface departmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['department'], meta: { name: 'department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {departmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends departmentFindUniqueArgs>(args: SelectSubset<T, departmentFindUniqueArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {departmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends departmentFindUniqueOrThrowArgs>(args: SelectSubset<T, departmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends departmentFindFirstArgs>(args?: SelectSubset<T, departmentFindFirstArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends departmentFindFirstOrThrowArgs>(args?: SelectSubset<T, departmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends departmentFindManyArgs>(args?: SelectSubset<T, departmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {departmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends departmentCreateArgs>(args: SelectSubset<T, departmentCreateArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {departmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends departmentCreateManyArgs>(args?: SelectSubset<T, departmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {departmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends departmentCreateManyAndReturnArgs>(args?: SelectSubset<T, departmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {departmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends departmentDeleteArgs>(args: SelectSubset<T, departmentDeleteArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {departmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends departmentUpdateArgs>(args: SelectSubset<T, departmentUpdateArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {departmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends departmentDeleteManyArgs>(args?: SelectSubset<T, departmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends departmentUpdateManyArgs>(args: SelectSubset<T, departmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {departmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends departmentUpdateManyAndReturnArgs>(args: SelectSubset<T, departmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {departmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends departmentUpsertArgs>(args: SelectSubset<T, departmentUpsertArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends departmentCountArgs>(
      args?: Subset<T, departmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {departmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends departmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: departmentGroupByArgs['orderBy'] }
        : { orderBy?: departmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, departmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the department model
   */
  readonly fields: departmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__departmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    topic_topic_departmentTodepartment<T extends department$topic_topic_departmentTodepartmentArgs<ExtArgs> = {}>(args?: Subset<T, department$topic_topic_departmentTodepartmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    question_log_question_department<T extends department$question_log_question_departmentArgs<ExtArgs> = {}>(args?: Subset<T, department$question_log_question_departmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the department model
   */
  interface departmentFieldRefs {
    readonly id: FieldRef<"department", 'Int'>
    readonly created_at: FieldRef<"department", 'DateTime'>
    readonly name: FieldRef<"department", 'String'>
    readonly uuid: FieldRef<"department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * department findUnique
   */
  export type departmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter, which department to fetch.
     */
    where: departmentWhereUniqueInput
  }

  /**
   * department findUniqueOrThrow
   */
  export type departmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter, which department to fetch.
     */
    where: departmentWhereUniqueInput
  }

  /**
   * department findFirst
   */
  export type departmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter, which department to fetch.
     */
    where?: departmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentOrderByWithRelationInput | departmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * department findFirstOrThrow
   */
  export type departmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter, which department to fetch.
     */
    where?: departmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentOrderByWithRelationInput | departmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for departments.
     */
    cursor?: departmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * department findMany
   */
  export type departmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter, which departments to fetch.
     */
    where?: departmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of departments to fetch.
     */
    orderBy?: departmentOrderByWithRelationInput | departmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing departments.
     */
    cursor?: departmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * department create
   */
  export type departmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * The data needed to create a department.
     */
    data?: XOR<departmentCreateInput, departmentUncheckedCreateInput>
  }

  /**
   * department createMany
   */
  export type departmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many departments.
     */
    data: departmentCreateManyInput | departmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * department createManyAndReturn
   */
  export type departmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * The data used to create many departments.
     */
    data: departmentCreateManyInput | departmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * department update
   */
  export type departmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * The data needed to update a department.
     */
    data: XOR<departmentUpdateInput, departmentUncheckedUpdateInput>
    /**
     * Choose, which department to update.
     */
    where: departmentWhereUniqueInput
  }

  /**
   * department updateMany
   */
  export type departmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update departments.
     */
    data: XOR<departmentUpdateManyMutationInput, departmentUncheckedUpdateManyInput>
    /**
     * Filter which departments to update
     */
    where?: departmentWhereInput
    /**
     * Limit how many departments to update.
     */
    limit?: number
  }

  /**
   * department updateManyAndReturn
   */
  export type departmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * The data used to update departments.
     */
    data: XOR<departmentUpdateManyMutationInput, departmentUncheckedUpdateManyInput>
    /**
     * Filter which departments to update
     */
    where?: departmentWhereInput
    /**
     * Limit how many departments to update.
     */
    limit?: number
  }

  /**
   * department upsert
   */
  export type departmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * The filter to search for the department to update in case it exists.
     */
    where: departmentWhereUniqueInput
    /**
     * In case the department found by the `where` argument doesn't exist, create a new department with this data.
     */
    create: XOR<departmentCreateInput, departmentUncheckedCreateInput>
    /**
     * In case the department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<departmentUpdateInput, departmentUncheckedUpdateInput>
  }

  /**
   * department delete
   */
  export type departmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    /**
     * Filter which department to delete.
     */
    where: departmentWhereUniqueInput
  }

  /**
   * department deleteMany
   */
  export type departmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which departments to delete
     */
    where?: departmentWhereInput
    /**
     * Limit how many departments to delete.
     */
    limit?: number
  }

  /**
   * department.topic_topic_departmentTodepartment
   */
  export type department$topic_topic_departmentTodepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    where?: topicWhereInput
    orderBy?: topicOrderByWithRelationInput | topicOrderByWithRelationInput[]
    cursor?: topicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * department.question_log_question_department
   */
  export type department$question_log_question_departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    where?: question_logWhereInput
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    cursor?: question_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_logScalarFieldEnum | Question_logScalarFieldEnum[]
  }

  /**
   * department without action
   */
  export type departmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
  }


  /**
   * Model participant
   */

  export type AggregateParticipant = {
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  export type ParticipantAvgAggregateOutputType = {
    id: number | null
  }

  export type ParticipantSumAggregateOutputType = {
    id: number | null
  }

  export type ParticipantMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    email: string | null
    name: string | null
    google_id: string | null
    uuid: string | null
  }

  export type ParticipantMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    email: string | null
    name: string | null
    google_id: string | null
    uuid: string | null
  }

  export type ParticipantCountAggregateOutputType = {
    id: number
    created_at: number
    email: number
    name: number
    google_id: number
    uuid: number
    _all: number
  }


  export type ParticipantAvgAggregateInputType = {
    id?: true
  }

  export type ParticipantSumAggregateInputType = {
    id?: true
  }

  export type ParticipantMinAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    google_id?: true
    uuid?: true
  }

  export type ParticipantMaxAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    google_id?: true
    uuid?: true
  }

  export type ParticipantCountAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    google_id?: true
    uuid?: true
    _all?: true
  }

  export type ParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participant to aggregate.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned participants
    **/
    _count?: true | ParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantMaxAggregateInputType
  }

  export type GetParticipantAggregateType<T extends ParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipant[P]>
      : GetScalarType<T[P], AggregateParticipant[P]>
  }




  export type participantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: participantWhereInput
    orderBy?: participantOrderByWithAggregationInput | participantOrderByWithAggregationInput[]
    by: ParticipantScalarFieldEnum[] | ParticipantScalarFieldEnum
    having?: participantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantCountAggregateInputType | true
    _avg?: ParticipantAvgAggregateInputType
    _sum?: ParticipantSumAggregateInputType
    _min?: ParticipantMinAggregateInputType
    _max?: ParticipantMaxAggregateInputType
  }

  export type ParticipantGroupByOutputType = {
    id: number
    created_at: Date
    email: string
    name: string
    google_id: string
    uuid: string
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  type GetParticipantGroupByPayload<T extends participantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
        }
      >
    >


  export type participantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    google_id?: boolean
    uuid?: boolean
    question_log?: boolean | participant$question_logArgs<ExtArgs>
    _count?: boolean | ParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant"]>

  export type participantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    google_id?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["participant"]>

  export type participantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    google_id?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["participant"]>

  export type participantSelectScalar = {
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    google_id?: boolean
    uuid?: boolean
  }

  export type participantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "email" | "name" | "google_id" | "uuid", ExtArgs["result"]["participant"]>
  export type participantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | participant$question_logArgs<ExtArgs>
    _count?: boolean | ParticipantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type participantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type participantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $participantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "participant"
    objects: {
      question_log: Prisma.$question_logPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      email: string
      name: string
      google_id: string
      uuid: string
    }, ExtArgs["result"]["participant"]>
    composites: {}
  }

  type participantGetPayload<S extends boolean | null | undefined | participantDefaultArgs> = $Result.GetResult<Prisma.$participantPayload, S>

  type participantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<participantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParticipantCountAggregateInputType | true
    }

  export interface participantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['participant'], meta: { name: 'participant' } }
    /**
     * Find zero or one Participant that matches the filter.
     * @param {participantFindUniqueArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends participantFindUniqueArgs>(args: SelectSubset<T, participantFindUniqueArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {participantFindUniqueOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends participantFindUniqueOrThrowArgs>(args: SelectSubset<T, participantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindFirstArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends participantFindFirstArgs>(args?: SelectSubset<T, participantFindFirstArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindFirstOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends participantFindFirstOrThrowArgs>(args?: SelectSubset<T, participantFindFirstOrThrowArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participants
     * const participants = await prisma.participant.findMany()
     * 
     * // Get first 10 Participants
     * const participants = await prisma.participant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participantWithIdOnly = await prisma.participant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends participantFindManyArgs>(args?: SelectSubset<T, participantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participant.
     * @param {participantCreateArgs} args - Arguments to create a Participant.
     * @example
     * // Create one Participant
     * const Participant = await prisma.participant.create({
     *   data: {
     *     // ... data to create a Participant
     *   }
     * })
     * 
     */
    create<T extends participantCreateArgs>(args: SelectSubset<T, participantCreateArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participants.
     * @param {participantCreateManyArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends participantCreateManyArgs>(args?: SelectSubset<T, participantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participants and returns the data saved in the database.
     * @param {participantCreateManyAndReturnArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participants and only return the `id`
     * const participantWithIdOnly = await prisma.participant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends participantCreateManyAndReturnArgs>(args?: SelectSubset<T, participantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participant.
     * @param {participantDeleteArgs} args - Arguments to delete one Participant.
     * @example
     * // Delete one Participant
     * const Participant = await prisma.participant.delete({
     *   where: {
     *     // ... filter to delete one Participant
     *   }
     * })
     * 
     */
    delete<T extends participantDeleteArgs>(args: SelectSubset<T, participantDeleteArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participant.
     * @param {participantUpdateArgs} args - Arguments to update one Participant.
     * @example
     * // Update one Participant
     * const participant = await prisma.participant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends participantUpdateArgs>(args: SelectSubset<T, participantUpdateArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participants.
     * @param {participantDeleteManyArgs} args - Arguments to filter Participants to delete.
     * @example
     * // Delete a few Participants
     * const { count } = await prisma.participant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends participantDeleteManyArgs>(args?: SelectSubset<T, participantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends participantUpdateManyArgs>(args: SelectSubset<T, participantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants and returns the data updated in the database.
     * @param {participantUpdateManyAndReturnArgs} args - Arguments to update many Participants.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participants and only return the `id`
     * const participantWithIdOnly = await prisma.participant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends participantUpdateManyAndReturnArgs>(args: SelectSubset<T, participantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participant.
     * @param {participantUpsertArgs} args - Arguments to update or create a Participant.
     * @example
     * // Update or create a Participant
     * const participant = await prisma.participant.upsert({
     *   create: {
     *     // ... data to create a Participant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participant we want to update
     *   }
     * })
     */
    upsert<T extends participantUpsertArgs>(args: SelectSubset<T, participantUpsertArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantCountArgs} args - Arguments to filter Participants to count.
     * @example
     * // Count the number of Participants
     * const count = await prisma.participant.count({
     *   where: {
     *     // ... the filter for the Participants we want to count
     *   }
     * })
    **/
    count<T extends participantCountArgs>(
      args?: Subset<T, participantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantAggregateArgs>(args: Subset<T, ParticipantAggregateArgs>): Prisma.PrismaPromise<GetParticipantAggregateType<T>>

    /**
     * Group by Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {participantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends participantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: participantGroupByArgs['orderBy'] }
        : { orderBy?: participantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, participantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the participant model
   */
  readonly fields: participantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for participant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__participantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question_log<T extends participant$question_logArgs<ExtArgs> = {}>(args?: Subset<T, participant$question_logArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the participant model
   */
  interface participantFieldRefs {
    readonly id: FieldRef<"participant", 'Int'>
    readonly created_at: FieldRef<"participant", 'DateTime'>
    readonly email: FieldRef<"participant", 'String'>
    readonly name: FieldRef<"participant", 'String'>
    readonly google_id: FieldRef<"participant", 'String'>
    readonly uuid: FieldRef<"participant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * participant findUnique
   */
  export type participantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant findUniqueOrThrow
   */
  export type participantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant findFirst
   */
  export type participantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant findFirstOrThrow
   */
  export type participantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participant to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant findMany
   */
  export type participantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter, which participants to fetch.
     */
    where?: participantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of participants to fetch.
     */
    orderBy?: participantOrderByWithRelationInput | participantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing participants.
     */
    cursor?: participantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` participants.
     */
    skip?: number
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * participant create
   */
  export type participantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The data needed to create a participant.
     */
    data: XOR<participantCreateInput, participantUncheckedCreateInput>
  }

  /**
   * participant createMany
   */
  export type participantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many participants.
     */
    data: participantCreateManyInput | participantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant createManyAndReturn
   */
  export type participantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * The data used to create many participants.
     */
    data: participantCreateManyInput | participantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * participant update
   */
  export type participantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The data needed to update a participant.
     */
    data: XOR<participantUpdateInput, participantUncheckedUpdateInput>
    /**
     * Choose, which participant to update.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant updateMany
   */
  export type participantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update participants.
     */
    data: XOR<participantUpdateManyMutationInput, participantUncheckedUpdateManyInput>
    /**
     * Filter which participants to update
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to update.
     */
    limit?: number
  }

  /**
   * participant updateManyAndReturn
   */
  export type participantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * The data used to update participants.
     */
    data: XOR<participantUpdateManyMutationInput, participantUncheckedUpdateManyInput>
    /**
     * Filter which participants to update
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to update.
     */
    limit?: number
  }

  /**
   * participant upsert
   */
  export type participantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * The filter to search for the participant to update in case it exists.
     */
    where: participantWhereUniqueInput
    /**
     * In case the participant found by the `where` argument doesn't exist, create a new participant with this data.
     */
    create: XOR<participantCreateInput, participantUncheckedCreateInput>
    /**
     * In case the participant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<participantUpdateInput, participantUncheckedUpdateInput>
  }

  /**
   * participant delete
   */
  export type participantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
    /**
     * Filter which participant to delete.
     */
    where: participantWhereUniqueInput
  }

  /**
   * participant deleteMany
   */
  export type participantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which participants to delete
     */
    where?: participantWhereInput
    /**
     * Limit how many participants to delete.
     */
    limit?: number
  }

  /**
   * participant.question_log
   */
  export type participant$question_logArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    where?: question_logWhereInput
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    cursor?: question_logWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_logScalarFieldEnum | Question_logScalarFieldEnum[]
  }

  /**
   * participant without action
   */
  export type participantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the participant
     */
    select?: participantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the participant
     */
    omit?: participantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: participantInclude<ExtArgs> | null
  }


  /**
   * Model topic
   */

  export type AggregateTopic = {
    _count: TopicCountAggregateOutputType | null
    _avg: TopicAvgAggregateOutputType | null
    _sum: TopicSumAggregateOutputType | null
    _min: TopicMinAggregateOutputType | null
    _max: TopicMaxAggregateOutputType | null
  }

  export type TopicAvgAggregateOutputType = {
    id: number | null
    department: number | null
  }

  export type TopicSumAggregateOutputType = {
    id: number | null
    department: number | null
  }

  export type TopicMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    name: string | null
    department: number | null
    uuid: string | null
  }

  export type TopicMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    name: string | null
    department: number | null
    uuid: string | null
  }

  export type TopicCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    department: number
    uuid: number
    _all: number
  }


  export type TopicAvgAggregateInputType = {
    id?: true
    department?: true
  }

  export type TopicSumAggregateInputType = {
    id?: true
    department?: true
  }

  export type TopicMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    department?: true
    uuid?: true
  }

  export type TopicMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    department?: true
    uuid?: true
  }

  export type TopicCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    department?: true
    uuid?: true
    _all?: true
  }

  export type TopicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which topic to aggregate.
     */
    where?: topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicOrderByWithRelationInput | topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned topics
    **/
    _count?: true | TopicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TopicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TopicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopicMaxAggregateInputType
  }

  export type GetTopicAggregateType<T extends TopicAggregateArgs> = {
        [P in keyof T & keyof AggregateTopic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopic[P]>
      : GetScalarType<T[P], AggregateTopic[P]>
  }




  export type topicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: topicWhereInput
    orderBy?: topicOrderByWithAggregationInput | topicOrderByWithAggregationInput[]
    by: TopicScalarFieldEnum[] | TopicScalarFieldEnum
    having?: topicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopicCountAggregateInputType | true
    _avg?: TopicAvgAggregateInputType
    _sum?: TopicSumAggregateInputType
    _min?: TopicMinAggregateInputType
    _max?: TopicMaxAggregateInputType
  }

  export type TopicGroupByOutputType = {
    id: number
    created_at: Date
    name: string | null
    department: number | null
    uuid: string
    _count: TopicCountAggregateOutputType | null
    _avg: TopicAvgAggregateOutputType | null
    _sum: TopicSumAggregateOutputType | null
    _min: TopicMinAggregateOutputType | null
    _max: TopicMaxAggregateOutputType | null
  }

  type GetTopicGroupByPayload<T extends topicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopicGroupByOutputType[P]>
            : GetScalarType<T[P], TopicGroupByOutputType[P]>
        }
      >
    >


  export type topicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    department?: boolean
    uuid?: boolean
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
    question_logs?: boolean | topic$question_logsArgs<ExtArgs>
    _count?: boolean | TopicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type topicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    department?: boolean
    uuid?: boolean
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type topicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    department?: boolean
    uuid?: boolean
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
  }, ExtArgs["result"]["topic"]>

  export type topicSelectScalar = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    department?: boolean
    uuid?: boolean
  }

  export type topicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "name" | "department" | "uuid", ExtArgs["result"]["topic"]>
  export type topicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
    question_logs?: boolean | topic$question_logsArgs<ExtArgs>
    _count?: boolean | TopicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type topicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
  }
  export type topicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department_topic_departmentTodepartment?: boolean | topic$department_topic_departmentTodepartmentArgs<ExtArgs>
  }

  export type $topicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "topic"
    objects: {
      department_topic_departmentTodepartment: Prisma.$departmentPayload<ExtArgs> | null
      question_logs: Prisma.$question_log_topicPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      name: string | null
      department: number | null
      uuid: string
    }, ExtArgs["result"]["topic"]>
    composites: {}
  }

  type topicGetPayload<S extends boolean | null | undefined | topicDefaultArgs> = $Result.GetResult<Prisma.$topicPayload, S>

  type topicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<topicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TopicCountAggregateInputType | true
    }

  export interface topicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['topic'], meta: { name: 'topic' } }
    /**
     * Find zero or one Topic that matches the filter.
     * @param {topicFindUniqueArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends topicFindUniqueArgs>(args: SelectSubset<T, topicFindUniqueArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Topic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {topicFindUniqueOrThrowArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends topicFindUniqueOrThrowArgs>(args: SelectSubset<T, topicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicFindFirstArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends topicFindFirstArgs>(args?: SelectSubset<T, topicFindFirstArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Topic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicFindFirstOrThrowArgs} args - Arguments to find a Topic
     * @example
     * // Get one Topic
     * const topic = await prisma.topic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends topicFindFirstOrThrowArgs>(args?: SelectSubset<T, topicFindFirstOrThrowArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Topics
     * const topics = await prisma.topic.findMany()
     * 
     * // Get first 10 Topics
     * const topics = await prisma.topic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topicWithIdOnly = await prisma.topic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends topicFindManyArgs>(args?: SelectSubset<T, topicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Topic.
     * @param {topicCreateArgs} args - Arguments to create a Topic.
     * @example
     * // Create one Topic
     * const Topic = await prisma.topic.create({
     *   data: {
     *     // ... data to create a Topic
     *   }
     * })
     * 
     */
    create<T extends topicCreateArgs>(args: SelectSubset<T, topicCreateArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Topics.
     * @param {topicCreateManyArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topic = await prisma.topic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends topicCreateManyArgs>(args?: SelectSubset<T, topicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Topics and returns the data saved in the database.
     * @param {topicCreateManyAndReturnArgs} args - Arguments to create many Topics.
     * @example
     * // Create many Topics
     * const topic = await prisma.topic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Topics and only return the `id`
     * const topicWithIdOnly = await prisma.topic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends topicCreateManyAndReturnArgs>(args?: SelectSubset<T, topicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Topic.
     * @param {topicDeleteArgs} args - Arguments to delete one Topic.
     * @example
     * // Delete one Topic
     * const Topic = await prisma.topic.delete({
     *   where: {
     *     // ... filter to delete one Topic
     *   }
     * })
     * 
     */
    delete<T extends topicDeleteArgs>(args: SelectSubset<T, topicDeleteArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Topic.
     * @param {topicUpdateArgs} args - Arguments to update one Topic.
     * @example
     * // Update one Topic
     * const topic = await prisma.topic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends topicUpdateArgs>(args: SelectSubset<T, topicUpdateArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Topics.
     * @param {topicDeleteManyArgs} args - Arguments to filter Topics to delete.
     * @example
     * // Delete a few Topics
     * const { count } = await prisma.topic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends topicDeleteManyArgs>(args?: SelectSubset<T, topicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Topics
     * const topic = await prisma.topic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends topicUpdateManyArgs>(args: SelectSubset<T, topicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics and returns the data updated in the database.
     * @param {topicUpdateManyAndReturnArgs} args - Arguments to update many Topics.
     * @example
     * // Update many Topics
     * const topic = await prisma.topic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Topics and only return the `id`
     * const topicWithIdOnly = await prisma.topic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends topicUpdateManyAndReturnArgs>(args: SelectSubset<T, topicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Topic.
     * @param {topicUpsertArgs} args - Arguments to update or create a Topic.
     * @example
     * // Update or create a Topic
     * const topic = await prisma.topic.upsert({
     *   create: {
     *     // ... data to create a Topic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Topic we want to update
     *   }
     * })
     */
    upsert<T extends topicUpsertArgs>(args: SelectSubset<T, topicUpsertArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicCountArgs} args - Arguments to filter Topics to count.
     * @example
     * // Count the number of Topics
     * const count = await prisma.topic.count({
     *   where: {
     *     // ... the filter for the Topics we want to count
     *   }
     * })
    **/
    count<T extends topicCountArgs>(
      args?: Subset<T, topicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopicAggregateArgs>(args: Subset<T, TopicAggregateArgs>): Prisma.PrismaPromise<GetTopicAggregateType<T>>

    /**
     * Group by Topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {topicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends topicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: topicGroupByArgs['orderBy'] }
        : { orderBy?: topicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, topicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the topic model
   */
  readonly fields: topicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for topic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__topicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department_topic_departmentTodepartment<T extends topic$department_topic_departmentTodepartmentArgs<ExtArgs> = {}>(args?: Subset<T, topic$department_topic_departmentTodepartmentArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    question_logs<T extends topic$question_logsArgs<ExtArgs> = {}>(args?: Subset<T, topic$question_logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the topic model
   */
  interface topicFieldRefs {
    readonly id: FieldRef<"topic", 'Int'>
    readonly created_at: FieldRef<"topic", 'DateTime'>
    readonly name: FieldRef<"topic", 'String'>
    readonly department: FieldRef<"topic", 'Int'>
    readonly uuid: FieldRef<"topic", 'String'>
  }
    

  // Custom InputTypes
  /**
   * topic findUnique
   */
  export type topicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter, which topic to fetch.
     */
    where: topicWhereUniqueInput
  }

  /**
   * topic findUniqueOrThrow
   */
  export type topicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter, which topic to fetch.
     */
    where: topicWhereUniqueInput
  }

  /**
   * topic findFirst
   */
  export type topicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter, which topic to fetch.
     */
    where?: topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicOrderByWithRelationInput | topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for topics.
     */
    cursor?: topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of topics.
     */
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * topic findFirstOrThrow
   */
  export type topicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter, which topic to fetch.
     */
    where?: topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicOrderByWithRelationInput | topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for topics.
     */
    cursor?: topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of topics.
     */
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * topic findMany
   */
  export type topicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter, which topics to fetch.
     */
    where?: topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of topics to fetch.
     */
    orderBy?: topicOrderByWithRelationInput | topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing topics.
     */
    cursor?: topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` topics.
     */
    skip?: number
    distinct?: TopicScalarFieldEnum | TopicScalarFieldEnum[]
  }

  /**
   * topic create
   */
  export type topicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * The data needed to create a topic.
     */
    data?: XOR<topicCreateInput, topicUncheckedCreateInput>
  }

  /**
   * topic createMany
   */
  export type topicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many topics.
     */
    data: topicCreateManyInput | topicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * topic createManyAndReturn
   */
  export type topicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * The data used to create many topics.
     */
    data: topicCreateManyInput | topicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * topic update
   */
  export type topicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * The data needed to update a topic.
     */
    data: XOR<topicUpdateInput, topicUncheckedUpdateInput>
    /**
     * Choose, which topic to update.
     */
    where: topicWhereUniqueInput
  }

  /**
   * topic updateMany
   */
  export type topicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update topics.
     */
    data: XOR<topicUpdateManyMutationInput, topicUncheckedUpdateManyInput>
    /**
     * Filter which topics to update
     */
    where?: topicWhereInput
    /**
     * Limit how many topics to update.
     */
    limit?: number
  }

  /**
   * topic updateManyAndReturn
   */
  export type topicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * The data used to update topics.
     */
    data: XOR<topicUpdateManyMutationInput, topicUncheckedUpdateManyInput>
    /**
     * Filter which topics to update
     */
    where?: topicWhereInput
    /**
     * Limit how many topics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * topic upsert
   */
  export type topicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * The filter to search for the topic to update in case it exists.
     */
    where: topicWhereUniqueInput
    /**
     * In case the topic found by the `where` argument doesn't exist, create a new topic with this data.
     */
    create: XOR<topicCreateInput, topicUncheckedCreateInput>
    /**
     * In case the topic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<topicUpdateInput, topicUncheckedUpdateInput>
  }

  /**
   * topic delete
   */
  export type topicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
    /**
     * Filter which topic to delete.
     */
    where: topicWhereUniqueInput
  }

  /**
   * topic deleteMany
   */
  export type topicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which topics to delete
     */
    where?: topicWhereInput
    /**
     * Limit how many topics to delete.
     */
    limit?: number
  }

  /**
   * topic.department_topic_departmentTodepartment
   */
  export type topic$department_topic_departmentTodepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the department
     */
    select?: departmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the department
     */
    omit?: departmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: departmentInclude<ExtArgs> | null
    where?: departmentWhereInput
  }

  /**
   * topic.question_logs
   */
  export type topic$question_logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    where?: question_log_topicWhereInput
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    cursor?: question_log_topicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_log_topicScalarFieldEnum | Question_log_topicScalarFieldEnum[]
  }

  /**
   * topic without action
   */
  export type topicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the topic
     */
    select?: topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the topic
     */
    omit?: topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: topicInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    email: string | null
    name: string | null
    uuid: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    email: string | null
    name: string | null
    uuid: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    created_at: number
    email: number
    name: number
    uuid: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    uuid?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    uuid?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    created_at?: true
    email?: true
    name?: true
    uuid?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    created_at: Date
    email: string
    name: string
    uuid: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    uuid?: boolean
  }, ExtArgs["result"]["user"]>

  export type userSelectScalar = {
    id?: boolean
    created_at?: boolean
    email?: boolean
    name?: boolean
    uuid?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "email" | "name" | "uuid", ExtArgs["result"]["user"]>

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      email: string
      name: string
      uuid: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {userCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userCreateManyAndReturnArgs>(args?: SelectSubset<T, userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {userUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userUpdateManyAndReturnArgs>(args: SelectSubset<T, userUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'Int'>
    readonly created_at: FieldRef<"user", 'DateTime'>
    readonly email: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly uuid: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user createManyAndReturn
   */
  export type userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user updateManyAndReturn
   */
  export type userUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
  }


  /**
   * Model question_log
   */

  export type AggregateQuestion_log = {
    _count: Question_logCountAggregateOutputType | null
    _avg: Question_logAvgAggregateOutputType | null
    _sum: Question_logSumAggregateOutputType | null
    _min: Question_logMinAggregateOutputType | null
    _max: Question_logMaxAggregateOutputType | null
  }

  export type Question_logAvgAggregateOutputType = {
    id: number | null
    department: number | null
    participant: number | null
    timer: number | null
    question_count: number | null
    total_answers: number | null
    total_correct: number | null
    score: number | null
    timezone_offset: number | null
  }

  export type Question_logSumAggregateOutputType = {
    id: number | null
    department: number | null
    participant: number | null
    timer: number | null
    question_count: number | null
    total_answers: number | null
    total_correct: number | null
    score: number | null
    timezone_offset: number | null
  }

  export type Question_logMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    uuid: string | null
    department: number | null
    participant: number | null
    timer: number | null
    question_count: number | null
    difficulty: string | null
    completed: boolean | null
    total_answers: number | null
    total_correct: number | null
    score: number | null
    end_time: Date | null
    timezone_offset: number | null
    timezone_name: string | null
  }

  export type Question_logMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    uuid: string | null
    department: number | null
    participant: number | null
    timer: number | null
    question_count: number | null
    difficulty: string | null
    completed: boolean | null
    total_answers: number | null
    total_correct: number | null
    score: number | null
    end_time: Date | null
    timezone_offset: number | null
    timezone_name: string | null
  }

  export type Question_logCountAggregateOutputType = {
    id: number
    created_at: number
    uuid: number
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: number
    completed: number
    total_answers: number
    total_correct: number
    score: number
    end_time: number
    timezone_offset: number
    timezone_name: number
    _all: number
  }


  export type Question_logAvgAggregateInputType = {
    id?: true
    department?: true
    participant?: true
    timer?: true
    question_count?: true
    total_answers?: true
    total_correct?: true
    score?: true
    timezone_offset?: true
  }

  export type Question_logSumAggregateInputType = {
    id?: true
    department?: true
    participant?: true
    timer?: true
    question_count?: true
    total_answers?: true
    total_correct?: true
    score?: true
    timezone_offset?: true
  }

  export type Question_logMinAggregateInputType = {
    id?: true
    created_at?: true
    uuid?: true
    department?: true
    participant?: true
    timer?: true
    question_count?: true
    difficulty?: true
    completed?: true
    total_answers?: true
    total_correct?: true
    score?: true
    end_time?: true
    timezone_offset?: true
    timezone_name?: true
  }

  export type Question_logMaxAggregateInputType = {
    id?: true
    created_at?: true
    uuid?: true
    department?: true
    participant?: true
    timer?: true
    question_count?: true
    difficulty?: true
    completed?: true
    total_answers?: true
    total_correct?: true
    score?: true
    end_time?: true
    timezone_offset?: true
    timezone_name?: true
  }

  export type Question_logCountAggregateInputType = {
    id?: true
    created_at?: true
    uuid?: true
    department?: true
    participant?: true
    timer?: true
    question_count?: true
    difficulty?: true
    completed?: true
    total_answers?: true
    total_correct?: true
    score?: true
    end_time?: true
    timezone_offset?: true
    timezone_name?: true
    _all?: true
  }

  export type Question_logAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_log to aggregate.
     */
    where?: question_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_logs to fetch.
     */
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: question_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned question_logs
    **/
    _count?: true | Question_logCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Question_logAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Question_logSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Question_logMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Question_logMaxAggregateInputType
  }

  export type GetQuestion_logAggregateType<T extends Question_logAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion_log]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion_log[P]>
      : GetScalarType<T[P], AggregateQuestion_log[P]>
  }




  export type question_logGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_logWhereInput
    orderBy?: question_logOrderByWithAggregationInput | question_logOrderByWithAggregationInput[]
    by: Question_logScalarFieldEnum[] | Question_logScalarFieldEnum
    having?: question_logScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Question_logCountAggregateInputType | true
    _avg?: Question_logAvgAggregateInputType
    _sum?: Question_logSumAggregateInputType
    _min?: Question_logMinAggregateInputType
    _max?: Question_logMaxAggregateInputType
  }

  export type Question_logGroupByOutputType = {
    id: number
    created_at: Date
    uuid: string
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed: boolean
    total_answers: number
    total_correct: number
    score: number
    end_time: Date | null
    timezone_offset: number | null
    timezone_name: string | null
    _count: Question_logCountAggregateOutputType | null
    _avg: Question_logAvgAggregateOutputType | null
    _sum: Question_logSumAggregateOutputType | null
    _min: Question_logMinAggregateOutputType | null
    _max: Question_logMaxAggregateOutputType | null
  }

  type GetQuestion_logGroupByPayload<T extends question_logGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Question_logGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Question_logGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Question_logGroupByOutputType[P]>
            : GetScalarType<T[P], Question_logGroupByOutputType[P]>
        }
      >
    >


  export type question_logSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    uuid?: boolean
    department?: boolean
    participant?: boolean
    timer?: boolean
    question_count?: boolean
    difficulty?: boolean
    completed?: boolean
    total_answers?: boolean
    total_correct?: boolean
    score?: boolean
    end_time?: boolean
    timezone_offset?: boolean
    timezone_name?: boolean
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
    topics?: boolean | question_log$topicsArgs<ExtArgs>
    question_log_question?: boolean | question_log$question_log_questionArgs<ExtArgs>
    _count?: boolean | Question_logCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log"]>

  export type question_logSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    uuid?: boolean
    department?: boolean
    participant?: boolean
    timer?: boolean
    question_count?: boolean
    difficulty?: boolean
    completed?: boolean
    total_answers?: boolean
    total_correct?: boolean
    score?: boolean
    end_time?: boolean
    timezone_offset?: boolean
    timezone_name?: boolean
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log"]>

  export type question_logSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    uuid?: boolean
    department?: boolean
    participant?: boolean
    timer?: boolean
    question_count?: boolean
    difficulty?: boolean
    completed?: boolean
    total_answers?: boolean
    total_correct?: boolean
    score?: boolean
    end_time?: boolean
    timezone_offset?: boolean
    timezone_name?: boolean
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log"]>

  export type question_logSelectScalar = {
    id?: boolean
    created_at?: boolean
    uuid?: boolean
    department?: boolean
    participant?: boolean
    timer?: boolean
    question_count?: boolean
    difficulty?: boolean
    completed?: boolean
    total_answers?: boolean
    total_correct?: boolean
    score?: boolean
    end_time?: boolean
    timezone_offset?: boolean
    timezone_name?: boolean
  }

  export type question_logOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "uuid" | "department" | "participant" | "timer" | "question_count" | "difficulty" | "completed" | "total_answers" | "total_correct" | "score" | "end_time" | "timezone_offset" | "timezone_name", ExtArgs["result"]["question_log"]>
  export type question_logInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
    topics?: boolean | question_log$topicsArgs<ExtArgs>
    question_log_question?: boolean | question_log$question_log_questionArgs<ExtArgs>
    _count?: boolean | Question_logCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type question_logIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
  }
  export type question_logIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_generator?: boolean | participantDefaultArgs<ExtArgs>
    question_department?: boolean | departmentDefaultArgs<ExtArgs>
  }

  export type $question_logPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "question_log"
    objects: {
      question_generator: Prisma.$participantPayload<ExtArgs>
      question_department: Prisma.$departmentPayload<ExtArgs>
      topics: Prisma.$question_log_topicPayload<ExtArgs>[]
      question_log_question: Prisma.$question_log_questionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      uuid: string
      department: number
      participant: number
      timer: number
      question_count: number
      difficulty: string
      completed: boolean
      total_answers: number
      total_correct: number
      score: number
      end_time: Date | null
      timezone_offset: number | null
      timezone_name: string | null
    }, ExtArgs["result"]["question_log"]>
    composites: {}
  }

  type question_logGetPayload<S extends boolean | null | undefined | question_logDefaultArgs> = $Result.GetResult<Prisma.$question_logPayload, S>

  type question_logCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<question_logFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Question_logCountAggregateInputType | true
    }

  export interface question_logDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['question_log'], meta: { name: 'question_log' } }
    /**
     * Find zero or one Question_log that matches the filter.
     * @param {question_logFindUniqueArgs} args - Arguments to find a Question_log
     * @example
     * // Get one Question_log
     * const question_log = await prisma.question_log.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends question_logFindUniqueArgs>(args: SelectSubset<T, question_logFindUniqueArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question_log that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {question_logFindUniqueOrThrowArgs} args - Arguments to find a Question_log
     * @example
     * // Get one Question_log
     * const question_log = await prisma.question_log.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends question_logFindUniqueOrThrowArgs>(args: SelectSubset<T, question_logFindUniqueOrThrowArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logFindFirstArgs} args - Arguments to find a Question_log
     * @example
     * // Get one Question_log
     * const question_log = await prisma.question_log.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends question_logFindFirstArgs>(args?: SelectSubset<T, question_logFindFirstArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logFindFirstOrThrowArgs} args - Arguments to find a Question_log
     * @example
     * // Get one Question_log
     * const question_log = await prisma.question_log.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends question_logFindFirstOrThrowArgs>(args?: SelectSubset<T, question_logFindFirstOrThrowArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Question_logs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Question_logs
     * const question_logs = await prisma.question_log.findMany()
     * 
     * // Get first 10 Question_logs
     * const question_logs = await prisma.question_log.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const question_logWithIdOnly = await prisma.question_log.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends question_logFindManyArgs>(args?: SelectSubset<T, question_logFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question_log.
     * @param {question_logCreateArgs} args - Arguments to create a Question_log.
     * @example
     * // Create one Question_log
     * const Question_log = await prisma.question_log.create({
     *   data: {
     *     // ... data to create a Question_log
     *   }
     * })
     * 
     */
    create<T extends question_logCreateArgs>(args: SelectSubset<T, question_logCreateArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Question_logs.
     * @param {question_logCreateManyArgs} args - Arguments to create many Question_logs.
     * @example
     * // Create many Question_logs
     * const question_log = await prisma.question_log.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends question_logCreateManyArgs>(args?: SelectSubset<T, question_logCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Question_logs and returns the data saved in the database.
     * @param {question_logCreateManyAndReturnArgs} args - Arguments to create many Question_logs.
     * @example
     * // Create many Question_logs
     * const question_log = await prisma.question_log.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Question_logs and only return the `id`
     * const question_logWithIdOnly = await prisma.question_log.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends question_logCreateManyAndReturnArgs>(args?: SelectSubset<T, question_logCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question_log.
     * @param {question_logDeleteArgs} args - Arguments to delete one Question_log.
     * @example
     * // Delete one Question_log
     * const Question_log = await prisma.question_log.delete({
     *   where: {
     *     // ... filter to delete one Question_log
     *   }
     * })
     * 
     */
    delete<T extends question_logDeleteArgs>(args: SelectSubset<T, question_logDeleteArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question_log.
     * @param {question_logUpdateArgs} args - Arguments to update one Question_log.
     * @example
     * // Update one Question_log
     * const question_log = await prisma.question_log.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends question_logUpdateArgs>(args: SelectSubset<T, question_logUpdateArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Question_logs.
     * @param {question_logDeleteManyArgs} args - Arguments to filter Question_logs to delete.
     * @example
     * // Delete a few Question_logs
     * const { count } = await prisma.question_log.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends question_logDeleteManyArgs>(args?: SelectSubset<T, question_logDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Question_logs
     * const question_log = await prisma.question_log.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends question_logUpdateManyArgs>(args: SelectSubset<T, question_logUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_logs and returns the data updated in the database.
     * @param {question_logUpdateManyAndReturnArgs} args - Arguments to update many Question_logs.
     * @example
     * // Update many Question_logs
     * const question_log = await prisma.question_log.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Question_logs and only return the `id`
     * const question_logWithIdOnly = await prisma.question_log.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends question_logUpdateManyAndReturnArgs>(args: SelectSubset<T, question_logUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question_log.
     * @param {question_logUpsertArgs} args - Arguments to update or create a Question_log.
     * @example
     * // Update or create a Question_log
     * const question_log = await prisma.question_log.upsert({
     *   create: {
     *     // ... data to create a Question_log
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question_log we want to update
     *   }
     * })
     */
    upsert<T extends question_logUpsertArgs>(args: SelectSubset<T, question_logUpsertArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Question_logs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logCountArgs} args - Arguments to filter Question_logs to count.
     * @example
     * // Count the number of Question_logs
     * const count = await prisma.question_log.count({
     *   where: {
     *     // ... the filter for the Question_logs we want to count
     *   }
     * })
    **/
    count<T extends question_logCountArgs>(
      args?: Subset<T, question_logCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Question_logCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_logAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Question_logAggregateArgs>(args: Subset<T, Question_logAggregateArgs>): Prisma.PrismaPromise<GetQuestion_logAggregateType<T>>

    /**
     * Group by Question_log.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_logGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends question_logGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: question_logGroupByArgs['orderBy'] }
        : { orderBy?: question_logGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, question_logGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestion_logGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the question_log model
   */
  readonly fields: question_logFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for question_log.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__question_logClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question_generator<T extends participantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, participantDefaultArgs<ExtArgs>>): Prisma__participantClient<$Result.GetResult<Prisma.$participantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question_department<T extends departmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, departmentDefaultArgs<ExtArgs>>): Prisma__departmentClient<$Result.GetResult<Prisma.$departmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topics<T extends question_log$topicsArgs<ExtArgs> = {}>(args?: Subset<T, question_log$topicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    question_log_question<T extends question_log$question_log_questionArgs<ExtArgs> = {}>(args?: Subset<T, question_log$question_log_questionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the question_log model
   */
  interface question_logFieldRefs {
    readonly id: FieldRef<"question_log", 'Int'>
    readonly created_at: FieldRef<"question_log", 'DateTime'>
    readonly uuid: FieldRef<"question_log", 'String'>
    readonly department: FieldRef<"question_log", 'Int'>
    readonly participant: FieldRef<"question_log", 'Int'>
    readonly timer: FieldRef<"question_log", 'Int'>
    readonly question_count: FieldRef<"question_log", 'Int'>
    readonly difficulty: FieldRef<"question_log", 'String'>
    readonly completed: FieldRef<"question_log", 'Boolean'>
    readonly total_answers: FieldRef<"question_log", 'Int'>
    readonly total_correct: FieldRef<"question_log", 'Int'>
    readonly score: FieldRef<"question_log", 'Int'>
    readonly end_time: FieldRef<"question_log", 'DateTime'>
    readonly timezone_offset: FieldRef<"question_log", 'Int'>
    readonly timezone_name: FieldRef<"question_log", 'String'>
  }
    

  // Custom InputTypes
  /**
   * question_log findUnique
   */
  export type question_logFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter, which question_log to fetch.
     */
    where: question_logWhereUniqueInput
  }

  /**
   * question_log findUniqueOrThrow
   */
  export type question_logFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter, which question_log to fetch.
     */
    where: question_logWhereUniqueInput
  }

  /**
   * question_log findFirst
   */
  export type question_logFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter, which question_log to fetch.
     */
    where?: question_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_logs to fetch.
     */
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_logs.
     */
    cursor?: question_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_logs.
     */
    distinct?: Question_logScalarFieldEnum | Question_logScalarFieldEnum[]
  }

  /**
   * question_log findFirstOrThrow
   */
  export type question_logFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter, which question_log to fetch.
     */
    where?: question_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_logs to fetch.
     */
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_logs.
     */
    cursor?: question_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_logs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_logs.
     */
    distinct?: Question_logScalarFieldEnum | Question_logScalarFieldEnum[]
  }

  /**
   * question_log findMany
   */
  export type question_logFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter, which question_logs to fetch.
     */
    where?: question_logWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_logs to fetch.
     */
    orderBy?: question_logOrderByWithRelationInput | question_logOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing question_logs.
     */
    cursor?: question_logWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_logs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_logs.
     */
    skip?: number
    distinct?: Question_logScalarFieldEnum | Question_logScalarFieldEnum[]
  }

  /**
   * question_log create
   */
  export type question_logCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * The data needed to create a question_log.
     */
    data: XOR<question_logCreateInput, question_logUncheckedCreateInput>
  }

  /**
   * question_log createMany
   */
  export type question_logCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many question_logs.
     */
    data: question_logCreateManyInput | question_logCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * question_log createManyAndReturn
   */
  export type question_logCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * The data used to create many question_logs.
     */
    data: question_logCreateManyInput | question_logCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log update
   */
  export type question_logUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * The data needed to update a question_log.
     */
    data: XOR<question_logUpdateInput, question_logUncheckedUpdateInput>
    /**
     * Choose, which question_log to update.
     */
    where: question_logWhereUniqueInput
  }

  /**
   * question_log updateMany
   */
  export type question_logUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update question_logs.
     */
    data: XOR<question_logUpdateManyMutationInput, question_logUncheckedUpdateManyInput>
    /**
     * Filter which question_logs to update
     */
    where?: question_logWhereInput
    /**
     * Limit how many question_logs to update.
     */
    limit?: number
  }

  /**
   * question_log updateManyAndReturn
   */
  export type question_logUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * The data used to update question_logs.
     */
    data: XOR<question_logUpdateManyMutationInput, question_logUncheckedUpdateManyInput>
    /**
     * Filter which question_logs to update
     */
    where?: question_logWhereInput
    /**
     * Limit how many question_logs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log upsert
   */
  export type question_logUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * The filter to search for the question_log to update in case it exists.
     */
    where: question_logWhereUniqueInput
    /**
     * In case the question_log found by the `where` argument doesn't exist, create a new question_log with this data.
     */
    create: XOR<question_logCreateInput, question_logUncheckedCreateInput>
    /**
     * In case the question_log was found with the provided `where` argument, update it with this data.
     */
    update: XOR<question_logUpdateInput, question_logUncheckedUpdateInput>
  }

  /**
   * question_log delete
   */
  export type question_logDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
    /**
     * Filter which question_log to delete.
     */
    where: question_logWhereUniqueInput
  }

  /**
   * question_log deleteMany
   */
  export type question_logDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_logs to delete
     */
    where?: question_logWhereInput
    /**
     * Limit how many question_logs to delete.
     */
    limit?: number
  }

  /**
   * question_log.topics
   */
  export type question_log$topicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    where?: question_log_topicWhereInput
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    cursor?: question_log_topicWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_log_topicScalarFieldEnum | Question_log_topicScalarFieldEnum[]
  }

  /**
   * question_log.question_log_question
   */
  export type question_log$question_log_questionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    where?: question_log_questionWhereInput
    orderBy?: question_log_questionOrderByWithRelationInput | question_log_questionOrderByWithRelationInput[]
    cursor?: question_log_questionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_log_questionScalarFieldEnum | Question_log_questionScalarFieldEnum[]
  }

  /**
   * question_log without action
   */
  export type question_logDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log
     */
    select?: question_logSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log
     */
    omit?: question_logOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_logInclude<ExtArgs> | null
  }


  /**
   * Model question_log_topic
   */

  export type AggregateQuestion_log_topic = {
    _count: Question_log_topicCountAggregateOutputType | null
    _avg: Question_log_topicAvgAggregateOutputType | null
    _sum: Question_log_topicSumAggregateOutputType | null
    _min: Question_log_topicMinAggregateOutputType | null
    _max: Question_log_topicMaxAggregateOutputType | null
  }

  export type Question_log_topicAvgAggregateOutputType = {
    question_log_id: number | null
    topic_id: number | null
  }

  export type Question_log_topicSumAggregateOutputType = {
    question_log_id: number | null
    topic_id: number | null
  }

  export type Question_log_topicMinAggregateOutputType = {
    question_log_id: number | null
    topic_id: number | null
  }

  export type Question_log_topicMaxAggregateOutputType = {
    question_log_id: number | null
    topic_id: number | null
  }

  export type Question_log_topicCountAggregateOutputType = {
    question_log_id: number
    topic_id: number
    _all: number
  }


  export type Question_log_topicAvgAggregateInputType = {
    question_log_id?: true
    topic_id?: true
  }

  export type Question_log_topicSumAggregateInputType = {
    question_log_id?: true
    topic_id?: true
  }

  export type Question_log_topicMinAggregateInputType = {
    question_log_id?: true
    topic_id?: true
  }

  export type Question_log_topicMaxAggregateInputType = {
    question_log_id?: true
    topic_id?: true
  }

  export type Question_log_topicCountAggregateInputType = {
    question_log_id?: true
    topic_id?: true
    _all?: true
  }

  export type Question_log_topicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_log_topic to aggregate.
     */
    where?: question_log_topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_topics to fetch.
     */
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: question_log_topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned question_log_topics
    **/
    _count?: true | Question_log_topicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Question_log_topicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Question_log_topicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Question_log_topicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Question_log_topicMaxAggregateInputType
  }

  export type GetQuestion_log_topicAggregateType<T extends Question_log_topicAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion_log_topic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion_log_topic[P]>
      : GetScalarType<T[P], AggregateQuestion_log_topic[P]>
  }




  export type question_log_topicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_log_topicWhereInput
    orderBy?: question_log_topicOrderByWithAggregationInput | question_log_topicOrderByWithAggregationInput[]
    by: Question_log_topicScalarFieldEnum[] | Question_log_topicScalarFieldEnum
    having?: question_log_topicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Question_log_topicCountAggregateInputType | true
    _avg?: Question_log_topicAvgAggregateInputType
    _sum?: Question_log_topicSumAggregateInputType
    _min?: Question_log_topicMinAggregateInputType
    _max?: Question_log_topicMaxAggregateInputType
  }

  export type Question_log_topicGroupByOutputType = {
    question_log_id: number
    topic_id: number
    _count: Question_log_topicCountAggregateOutputType | null
    _avg: Question_log_topicAvgAggregateOutputType | null
    _sum: Question_log_topicSumAggregateOutputType | null
    _min: Question_log_topicMinAggregateOutputType | null
    _max: Question_log_topicMaxAggregateOutputType | null
  }

  type GetQuestion_log_topicGroupByPayload<T extends question_log_topicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Question_log_topicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Question_log_topicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Question_log_topicGroupByOutputType[P]>
            : GetScalarType<T[P], Question_log_topicGroupByOutputType[P]>
        }
      >
    >


  export type question_log_topicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    question_log_id?: boolean
    topic_id?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_topic"]>

  export type question_log_topicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    question_log_id?: boolean
    topic_id?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_topic"]>

  export type question_log_topicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    question_log_id?: boolean
    topic_id?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_topic"]>

  export type question_log_topicSelectScalar = {
    question_log_id?: boolean
    topic_id?: boolean
  }

  export type question_log_topicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"question_log_id" | "topic_id", ExtArgs["result"]["question_log_topic"]>
  export type question_log_topicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }
  export type question_log_topicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }
  export type question_log_topicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    topic?: boolean | topicDefaultArgs<ExtArgs>
  }

  export type $question_log_topicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "question_log_topic"
    objects: {
      question_log: Prisma.$question_logPayload<ExtArgs>
      topic: Prisma.$topicPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      question_log_id: number
      topic_id: number
    }, ExtArgs["result"]["question_log_topic"]>
    composites: {}
  }

  type question_log_topicGetPayload<S extends boolean | null | undefined | question_log_topicDefaultArgs> = $Result.GetResult<Prisma.$question_log_topicPayload, S>

  type question_log_topicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<question_log_topicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Question_log_topicCountAggregateInputType | true
    }

  export interface question_log_topicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['question_log_topic'], meta: { name: 'question_log_topic' } }
    /**
     * Find zero or one Question_log_topic that matches the filter.
     * @param {question_log_topicFindUniqueArgs} args - Arguments to find a Question_log_topic
     * @example
     * // Get one Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends question_log_topicFindUniqueArgs>(args: SelectSubset<T, question_log_topicFindUniqueArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question_log_topic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {question_log_topicFindUniqueOrThrowArgs} args - Arguments to find a Question_log_topic
     * @example
     * // Get one Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends question_log_topicFindUniqueOrThrowArgs>(args: SelectSubset<T, question_log_topicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log_topic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicFindFirstArgs} args - Arguments to find a Question_log_topic
     * @example
     * // Get one Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends question_log_topicFindFirstArgs>(args?: SelectSubset<T, question_log_topicFindFirstArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log_topic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicFindFirstOrThrowArgs} args - Arguments to find a Question_log_topic
     * @example
     * // Get one Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends question_log_topicFindFirstOrThrowArgs>(args?: SelectSubset<T, question_log_topicFindFirstOrThrowArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Question_log_topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Question_log_topics
     * const question_log_topics = await prisma.question_log_topic.findMany()
     * 
     * // Get first 10 Question_log_topics
     * const question_log_topics = await prisma.question_log_topic.findMany({ take: 10 })
     * 
     * // Only select the `question_log_id`
     * const question_log_topicWithQuestion_log_idOnly = await prisma.question_log_topic.findMany({ select: { question_log_id: true } })
     * 
     */
    findMany<T extends question_log_topicFindManyArgs>(args?: SelectSubset<T, question_log_topicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question_log_topic.
     * @param {question_log_topicCreateArgs} args - Arguments to create a Question_log_topic.
     * @example
     * // Create one Question_log_topic
     * const Question_log_topic = await prisma.question_log_topic.create({
     *   data: {
     *     // ... data to create a Question_log_topic
     *   }
     * })
     * 
     */
    create<T extends question_log_topicCreateArgs>(args: SelectSubset<T, question_log_topicCreateArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Question_log_topics.
     * @param {question_log_topicCreateManyArgs} args - Arguments to create many Question_log_topics.
     * @example
     * // Create many Question_log_topics
     * const question_log_topic = await prisma.question_log_topic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends question_log_topicCreateManyArgs>(args?: SelectSubset<T, question_log_topicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Question_log_topics and returns the data saved in the database.
     * @param {question_log_topicCreateManyAndReturnArgs} args - Arguments to create many Question_log_topics.
     * @example
     * // Create many Question_log_topics
     * const question_log_topic = await prisma.question_log_topic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Question_log_topics and only return the `question_log_id`
     * const question_log_topicWithQuestion_log_idOnly = await prisma.question_log_topic.createManyAndReturn({
     *   select: { question_log_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends question_log_topicCreateManyAndReturnArgs>(args?: SelectSubset<T, question_log_topicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question_log_topic.
     * @param {question_log_topicDeleteArgs} args - Arguments to delete one Question_log_topic.
     * @example
     * // Delete one Question_log_topic
     * const Question_log_topic = await prisma.question_log_topic.delete({
     *   where: {
     *     // ... filter to delete one Question_log_topic
     *   }
     * })
     * 
     */
    delete<T extends question_log_topicDeleteArgs>(args: SelectSubset<T, question_log_topicDeleteArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question_log_topic.
     * @param {question_log_topicUpdateArgs} args - Arguments to update one Question_log_topic.
     * @example
     * // Update one Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends question_log_topicUpdateArgs>(args: SelectSubset<T, question_log_topicUpdateArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Question_log_topics.
     * @param {question_log_topicDeleteManyArgs} args - Arguments to filter Question_log_topics to delete.
     * @example
     * // Delete a few Question_log_topics
     * const { count } = await prisma.question_log_topic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends question_log_topicDeleteManyArgs>(args?: SelectSubset<T, question_log_topicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_log_topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Question_log_topics
     * const question_log_topic = await prisma.question_log_topic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends question_log_topicUpdateManyArgs>(args: SelectSubset<T, question_log_topicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_log_topics and returns the data updated in the database.
     * @param {question_log_topicUpdateManyAndReturnArgs} args - Arguments to update many Question_log_topics.
     * @example
     * // Update many Question_log_topics
     * const question_log_topic = await prisma.question_log_topic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Question_log_topics and only return the `question_log_id`
     * const question_log_topicWithQuestion_log_idOnly = await prisma.question_log_topic.updateManyAndReturn({
     *   select: { question_log_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends question_log_topicUpdateManyAndReturnArgs>(args: SelectSubset<T, question_log_topicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question_log_topic.
     * @param {question_log_topicUpsertArgs} args - Arguments to update or create a Question_log_topic.
     * @example
     * // Update or create a Question_log_topic
     * const question_log_topic = await prisma.question_log_topic.upsert({
     *   create: {
     *     // ... data to create a Question_log_topic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question_log_topic we want to update
     *   }
     * })
     */
    upsert<T extends question_log_topicUpsertArgs>(args: SelectSubset<T, question_log_topicUpsertArgs<ExtArgs>>): Prisma__question_log_topicClient<$Result.GetResult<Prisma.$question_log_topicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Question_log_topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicCountArgs} args - Arguments to filter Question_log_topics to count.
     * @example
     * // Count the number of Question_log_topics
     * const count = await prisma.question_log_topic.count({
     *   where: {
     *     // ... the filter for the Question_log_topics we want to count
     *   }
     * })
    **/
    count<T extends question_log_topicCountArgs>(
      args?: Subset<T, question_log_topicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Question_log_topicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question_log_topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_log_topicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Question_log_topicAggregateArgs>(args: Subset<T, Question_log_topicAggregateArgs>): Prisma.PrismaPromise<GetQuestion_log_topicAggregateType<T>>

    /**
     * Group by Question_log_topic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_topicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends question_log_topicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: question_log_topicGroupByArgs['orderBy'] }
        : { orderBy?: question_log_topicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, question_log_topicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestion_log_topicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the question_log_topic model
   */
  readonly fields: question_log_topicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for question_log_topic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__question_log_topicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question_log<T extends question_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, question_logDefaultArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    topic<T extends topicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, topicDefaultArgs<ExtArgs>>): Prisma__topicClient<$Result.GetResult<Prisma.$topicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the question_log_topic model
   */
  interface question_log_topicFieldRefs {
    readonly question_log_id: FieldRef<"question_log_topic", 'Int'>
    readonly topic_id: FieldRef<"question_log_topic", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * question_log_topic findUnique
   */
  export type question_log_topicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter, which question_log_topic to fetch.
     */
    where: question_log_topicWhereUniqueInput
  }

  /**
   * question_log_topic findUniqueOrThrow
   */
  export type question_log_topicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter, which question_log_topic to fetch.
     */
    where: question_log_topicWhereUniqueInput
  }

  /**
   * question_log_topic findFirst
   */
  export type question_log_topicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter, which question_log_topic to fetch.
     */
    where?: question_log_topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_topics to fetch.
     */
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_log_topics.
     */
    cursor?: question_log_topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_log_topics.
     */
    distinct?: Question_log_topicScalarFieldEnum | Question_log_topicScalarFieldEnum[]
  }

  /**
   * question_log_topic findFirstOrThrow
   */
  export type question_log_topicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter, which question_log_topic to fetch.
     */
    where?: question_log_topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_topics to fetch.
     */
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_log_topics.
     */
    cursor?: question_log_topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_log_topics.
     */
    distinct?: Question_log_topicScalarFieldEnum | Question_log_topicScalarFieldEnum[]
  }

  /**
   * question_log_topic findMany
   */
  export type question_log_topicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter, which question_log_topics to fetch.
     */
    where?: question_log_topicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_topics to fetch.
     */
    orderBy?: question_log_topicOrderByWithRelationInput | question_log_topicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing question_log_topics.
     */
    cursor?: question_log_topicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_topics.
     */
    skip?: number
    distinct?: Question_log_topicScalarFieldEnum | Question_log_topicScalarFieldEnum[]
  }

  /**
   * question_log_topic create
   */
  export type question_log_topicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * The data needed to create a question_log_topic.
     */
    data: XOR<question_log_topicCreateInput, question_log_topicUncheckedCreateInput>
  }

  /**
   * question_log_topic createMany
   */
  export type question_log_topicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many question_log_topics.
     */
    data: question_log_topicCreateManyInput | question_log_topicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * question_log_topic createManyAndReturn
   */
  export type question_log_topicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * The data used to create many question_log_topics.
     */
    data: question_log_topicCreateManyInput | question_log_topicCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log_topic update
   */
  export type question_log_topicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * The data needed to update a question_log_topic.
     */
    data: XOR<question_log_topicUpdateInput, question_log_topicUncheckedUpdateInput>
    /**
     * Choose, which question_log_topic to update.
     */
    where: question_log_topicWhereUniqueInput
  }

  /**
   * question_log_topic updateMany
   */
  export type question_log_topicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update question_log_topics.
     */
    data: XOR<question_log_topicUpdateManyMutationInput, question_log_topicUncheckedUpdateManyInput>
    /**
     * Filter which question_log_topics to update
     */
    where?: question_log_topicWhereInput
    /**
     * Limit how many question_log_topics to update.
     */
    limit?: number
  }

  /**
   * question_log_topic updateManyAndReturn
   */
  export type question_log_topicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * The data used to update question_log_topics.
     */
    data: XOR<question_log_topicUpdateManyMutationInput, question_log_topicUncheckedUpdateManyInput>
    /**
     * Filter which question_log_topics to update
     */
    where?: question_log_topicWhereInput
    /**
     * Limit how many question_log_topics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log_topic upsert
   */
  export type question_log_topicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * The filter to search for the question_log_topic to update in case it exists.
     */
    where: question_log_topicWhereUniqueInput
    /**
     * In case the question_log_topic found by the `where` argument doesn't exist, create a new question_log_topic with this data.
     */
    create: XOR<question_log_topicCreateInput, question_log_topicUncheckedCreateInput>
    /**
     * In case the question_log_topic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<question_log_topicUpdateInput, question_log_topicUncheckedUpdateInput>
  }

  /**
   * question_log_topic delete
   */
  export type question_log_topicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
    /**
     * Filter which question_log_topic to delete.
     */
    where: question_log_topicWhereUniqueInput
  }

  /**
   * question_log_topic deleteMany
   */
  export type question_log_topicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_log_topics to delete
     */
    where?: question_log_topicWhereInput
    /**
     * Limit how many question_log_topics to delete.
     */
    limit?: number
  }

  /**
   * question_log_topic without action
   */
  export type question_log_topicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_topic
     */
    select?: question_log_topicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_topic
     */
    omit?: question_log_topicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_topicInclude<ExtArgs> | null
  }


  /**
   * Model question_log_question
   */

  export type AggregateQuestion_log_question = {
    _count: Question_log_questionCountAggregateOutputType | null
    _avg: Question_log_questionAvgAggregateOutputType | null
    _sum: Question_log_questionSumAggregateOutputType | null
    _min: Question_log_questionMinAggregateOutputType | null
    _max: Question_log_questionMaxAggregateOutputType | null
  }

  export type Question_log_questionAvgAggregateOutputType = {
    id: number | null
    question_log_id: number | null
    answer: number | null
    selected_answer: number | null
  }

  export type Question_log_questionSumAggregateOutputType = {
    id: number | null
    question_log_id: number | null
    answer: number[]
    selected_answer: number[]
  }

  export type Question_log_questionMinAggregateOutputType = {
    id: number | null
    question_log_id: number | null
    question: string | null
    explanation: string | null
    topic: string | null
    question_type: $Enums.QuestionType | null
    created_at: Date | null
    uuid: string | null
  }

  export type Question_log_questionMaxAggregateOutputType = {
    id: number | null
    question_log_id: number | null
    question: string | null
    explanation: string | null
    topic: string | null
    question_type: $Enums.QuestionType | null
    created_at: Date | null
    uuid: string | null
  }

  export type Question_log_questionCountAggregateOutputType = {
    id: number
    question_log_id: number
    question: number
    options: number
    answer: number
    explanation: number
    topic: number
    selected_answer: number
    question_type: number
    created_at: number
    uuid: number
    _all: number
  }


  export type Question_log_questionAvgAggregateInputType = {
    id?: true
    question_log_id?: true
    answer?: true
    selected_answer?: true
  }

  export type Question_log_questionSumAggregateInputType = {
    id?: true
    question_log_id?: true
    answer?: true
    selected_answer?: true
  }

  export type Question_log_questionMinAggregateInputType = {
    id?: true
    question_log_id?: true
    question?: true
    explanation?: true
    topic?: true
    question_type?: true
    created_at?: true
    uuid?: true
  }

  export type Question_log_questionMaxAggregateInputType = {
    id?: true
    question_log_id?: true
    question?: true
    explanation?: true
    topic?: true
    question_type?: true
    created_at?: true
    uuid?: true
  }

  export type Question_log_questionCountAggregateInputType = {
    id?: true
    question_log_id?: true
    question?: true
    options?: true
    answer?: true
    explanation?: true
    topic?: true
    selected_answer?: true
    question_type?: true
    created_at?: true
    uuid?: true
    _all?: true
  }

  export type Question_log_questionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_log_question to aggregate.
     */
    where?: question_log_questionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_questions to fetch.
     */
    orderBy?: question_log_questionOrderByWithRelationInput | question_log_questionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: question_log_questionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned question_log_questions
    **/
    _count?: true | Question_log_questionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Question_log_questionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Question_log_questionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Question_log_questionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Question_log_questionMaxAggregateInputType
  }

  export type GetQuestion_log_questionAggregateType<T extends Question_log_questionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion_log_question]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion_log_question[P]>
      : GetScalarType<T[P], AggregateQuestion_log_question[P]>
  }




  export type question_log_questionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_log_questionWhereInput
    orderBy?: question_log_questionOrderByWithAggregationInput | question_log_questionOrderByWithAggregationInput[]
    by: Question_log_questionScalarFieldEnum[] | Question_log_questionScalarFieldEnum
    having?: question_log_questionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Question_log_questionCountAggregateInputType | true
    _avg?: Question_log_questionAvgAggregateInputType
    _sum?: Question_log_questionSumAggregateInputType
    _min?: Question_log_questionMinAggregateInputType
    _max?: Question_log_questionMaxAggregateInputType
  }

  export type Question_log_questionGroupByOutputType = {
    id: number
    question_log_id: number
    question: string
    options: string[]
    answer: number[]
    explanation: string | null
    topic: string | null
    selected_answer: number[]
    question_type: $Enums.QuestionType
    created_at: Date
    uuid: string
    _count: Question_log_questionCountAggregateOutputType | null
    _avg: Question_log_questionAvgAggregateOutputType | null
    _sum: Question_log_questionSumAggregateOutputType | null
    _min: Question_log_questionMinAggregateOutputType | null
    _max: Question_log_questionMaxAggregateOutputType | null
  }

  type GetQuestion_log_questionGroupByPayload<T extends question_log_questionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Question_log_questionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Question_log_questionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Question_log_questionGroupByOutputType[P]>
            : GetScalarType<T[P], Question_log_questionGroupByOutputType[P]>
        }
      >
    >


  export type question_log_questionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_log_id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    explanation?: boolean
    topic?: boolean
    selected_answer?: boolean
    question_type?: boolean
    created_at?: boolean
    uuid?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    question_keyword?: boolean | question_log_question$question_keywordArgs<ExtArgs>
    _count?: boolean | Question_log_questionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_question"]>

  export type question_log_questionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_log_id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    explanation?: boolean
    topic?: boolean
    selected_answer?: boolean
    question_type?: boolean
    created_at?: boolean
    uuid?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_question"]>

  export type question_log_questionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    question_log_id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    explanation?: boolean
    topic?: boolean
    selected_answer?: boolean
    question_type?: boolean
    created_at?: boolean
    uuid?: boolean
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_log_question"]>

  export type question_log_questionSelectScalar = {
    id?: boolean
    question_log_id?: boolean
    question?: boolean
    options?: boolean
    answer?: boolean
    explanation?: boolean
    topic?: boolean
    selected_answer?: boolean
    question_type?: boolean
    created_at?: boolean
    uuid?: boolean
  }

  export type question_log_questionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "question_log_id" | "question" | "options" | "answer" | "explanation" | "topic" | "selected_answer" | "question_type" | "created_at" | "uuid", ExtArgs["result"]["question_log_question"]>
  export type question_log_questionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
    question_keyword?: boolean | question_log_question$question_keywordArgs<ExtArgs>
    _count?: boolean | Question_log_questionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type question_log_questionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
  }
  export type question_log_questionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log?: boolean | question_logDefaultArgs<ExtArgs>
  }

  export type $question_log_questionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "question_log_question"
    objects: {
      question_log: Prisma.$question_logPayload<ExtArgs>
      question_keyword: Prisma.$question_keywordPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      question_log_id: number
      question: string
      options: string[]
      answer: number[]
      explanation: string | null
      topic: string | null
      selected_answer: number[]
      question_type: $Enums.QuestionType
      created_at: Date
      uuid: string
    }, ExtArgs["result"]["question_log_question"]>
    composites: {}
  }

  type question_log_questionGetPayload<S extends boolean | null | undefined | question_log_questionDefaultArgs> = $Result.GetResult<Prisma.$question_log_questionPayload, S>

  type question_log_questionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<question_log_questionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Question_log_questionCountAggregateInputType | true
    }

  export interface question_log_questionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['question_log_question'], meta: { name: 'question_log_question' } }
    /**
     * Find zero or one Question_log_question that matches the filter.
     * @param {question_log_questionFindUniqueArgs} args - Arguments to find a Question_log_question
     * @example
     * // Get one Question_log_question
     * const question_log_question = await prisma.question_log_question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends question_log_questionFindUniqueArgs>(args: SelectSubset<T, question_log_questionFindUniqueArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question_log_question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {question_log_questionFindUniqueOrThrowArgs} args - Arguments to find a Question_log_question
     * @example
     * // Get one Question_log_question
     * const question_log_question = await prisma.question_log_question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends question_log_questionFindUniqueOrThrowArgs>(args: SelectSubset<T, question_log_questionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log_question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionFindFirstArgs} args - Arguments to find a Question_log_question
     * @example
     * // Get one Question_log_question
     * const question_log_question = await prisma.question_log_question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends question_log_questionFindFirstArgs>(args?: SelectSubset<T, question_log_questionFindFirstArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_log_question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionFindFirstOrThrowArgs} args - Arguments to find a Question_log_question
     * @example
     * // Get one Question_log_question
     * const question_log_question = await prisma.question_log_question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends question_log_questionFindFirstOrThrowArgs>(args?: SelectSubset<T, question_log_questionFindFirstOrThrowArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Question_log_questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Question_log_questions
     * const question_log_questions = await prisma.question_log_question.findMany()
     * 
     * // Get first 10 Question_log_questions
     * const question_log_questions = await prisma.question_log_question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const question_log_questionWithIdOnly = await prisma.question_log_question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends question_log_questionFindManyArgs>(args?: SelectSubset<T, question_log_questionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question_log_question.
     * @param {question_log_questionCreateArgs} args - Arguments to create a Question_log_question.
     * @example
     * // Create one Question_log_question
     * const Question_log_question = await prisma.question_log_question.create({
     *   data: {
     *     // ... data to create a Question_log_question
     *   }
     * })
     * 
     */
    create<T extends question_log_questionCreateArgs>(args: SelectSubset<T, question_log_questionCreateArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Question_log_questions.
     * @param {question_log_questionCreateManyArgs} args - Arguments to create many Question_log_questions.
     * @example
     * // Create many Question_log_questions
     * const question_log_question = await prisma.question_log_question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends question_log_questionCreateManyArgs>(args?: SelectSubset<T, question_log_questionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Question_log_questions and returns the data saved in the database.
     * @param {question_log_questionCreateManyAndReturnArgs} args - Arguments to create many Question_log_questions.
     * @example
     * // Create many Question_log_questions
     * const question_log_question = await prisma.question_log_question.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Question_log_questions and only return the `id`
     * const question_log_questionWithIdOnly = await prisma.question_log_question.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends question_log_questionCreateManyAndReturnArgs>(args?: SelectSubset<T, question_log_questionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question_log_question.
     * @param {question_log_questionDeleteArgs} args - Arguments to delete one Question_log_question.
     * @example
     * // Delete one Question_log_question
     * const Question_log_question = await prisma.question_log_question.delete({
     *   where: {
     *     // ... filter to delete one Question_log_question
     *   }
     * })
     * 
     */
    delete<T extends question_log_questionDeleteArgs>(args: SelectSubset<T, question_log_questionDeleteArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question_log_question.
     * @param {question_log_questionUpdateArgs} args - Arguments to update one Question_log_question.
     * @example
     * // Update one Question_log_question
     * const question_log_question = await prisma.question_log_question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends question_log_questionUpdateArgs>(args: SelectSubset<T, question_log_questionUpdateArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Question_log_questions.
     * @param {question_log_questionDeleteManyArgs} args - Arguments to filter Question_log_questions to delete.
     * @example
     * // Delete a few Question_log_questions
     * const { count } = await prisma.question_log_question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends question_log_questionDeleteManyArgs>(args?: SelectSubset<T, question_log_questionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_log_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Question_log_questions
     * const question_log_question = await prisma.question_log_question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends question_log_questionUpdateManyArgs>(args: SelectSubset<T, question_log_questionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_log_questions and returns the data updated in the database.
     * @param {question_log_questionUpdateManyAndReturnArgs} args - Arguments to update many Question_log_questions.
     * @example
     * // Update many Question_log_questions
     * const question_log_question = await prisma.question_log_question.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Question_log_questions and only return the `id`
     * const question_log_questionWithIdOnly = await prisma.question_log_question.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends question_log_questionUpdateManyAndReturnArgs>(args: SelectSubset<T, question_log_questionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question_log_question.
     * @param {question_log_questionUpsertArgs} args - Arguments to update or create a Question_log_question.
     * @example
     * // Update or create a Question_log_question
     * const question_log_question = await prisma.question_log_question.upsert({
     *   create: {
     *     // ... data to create a Question_log_question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question_log_question we want to update
     *   }
     * })
     */
    upsert<T extends question_log_questionUpsertArgs>(args: SelectSubset<T, question_log_questionUpsertArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Question_log_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionCountArgs} args - Arguments to filter Question_log_questions to count.
     * @example
     * // Count the number of Question_log_questions
     * const count = await prisma.question_log_question.count({
     *   where: {
     *     // ... the filter for the Question_log_questions we want to count
     *   }
     * })
    **/
    count<T extends question_log_questionCountArgs>(
      args?: Subset<T, question_log_questionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Question_log_questionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question_log_question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_log_questionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Question_log_questionAggregateArgs>(args: Subset<T, Question_log_questionAggregateArgs>): Prisma.PrismaPromise<GetQuestion_log_questionAggregateType<T>>

    /**
     * Group by Question_log_question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_log_questionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends question_log_questionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: question_log_questionGroupByArgs['orderBy'] }
        : { orderBy?: question_log_questionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, question_log_questionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestion_log_questionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the question_log_question model
   */
  readonly fields: question_log_questionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for question_log_question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__question_log_questionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question_log<T extends question_logDefaultArgs<ExtArgs> = {}>(args?: Subset<T, question_logDefaultArgs<ExtArgs>>): Prisma__question_logClient<$Result.GetResult<Prisma.$question_logPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question_keyword<T extends question_log_question$question_keywordArgs<ExtArgs> = {}>(args?: Subset<T, question_log_question$question_keywordArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the question_log_question model
   */
  interface question_log_questionFieldRefs {
    readonly id: FieldRef<"question_log_question", 'Int'>
    readonly question_log_id: FieldRef<"question_log_question", 'Int'>
    readonly question: FieldRef<"question_log_question", 'String'>
    readonly options: FieldRef<"question_log_question", 'String[]'>
    readonly answer: FieldRef<"question_log_question", 'Int[]'>
    readonly explanation: FieldRef<"question_log_question", 'String'>
    readonly topic: FieldRef<"question_log_question", 'String'>
    readonly selected_answer: FieldRef<"question_log_question", 'Int[]'>
    readonly question_type: FieldRef<"question_log_question", 'QuestionType'>
    readonly created_at: FieldRef<"question_log_question", 'DateTime'>
    readonly uuid: FieldRef<"question_log_question", 'String'>
  }
    

  // Custom InputTypes
  /**
   * question_log_question findUnique
   */
  export type question_log_questionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter, which question_log_question to fetch.
     */
    where: question_log_questionWhereUniqueInput
  }

  /**
   * question_log_question findUniqueOrThrow
   */
  export type question_log_questionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter, which question_log_question to fetch.
     */
    where: question_log_questionWhereUniqueInput
  }

  /**
   * question_log_question findFirst
   */
  export type question_log_questionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter, which question_log_question to fetch.
     */
    where?: question_log_questionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_questions to fetch.
     */
    orderBy?: question_log_questionOrderByWithRelationInput | question_log_questionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_log_questions.
     */
    cursor?: question_log_questionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_log_questions.
     */
    distinct?: Question_log_questionScalarFieldEnum | Question_log_questionScalarFieldEnum[]
  }

  /**
   * question_log_question findFirstOrThrow
   */
  export type question_log_questionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter, which question_log_question to fetch.
     */
    where?: question_log_questionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_questions to fetch.
     */
    orderBy?: question_log_questionOrderByWithRelationInput | question_log_questionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_log_questions.
     */
    cursor?: question_log_questionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_log_questions.
     */
    distinct?: Question_log_questionScalarFieldEnum | Question_log_questionScalarFieldEnum[]
  }

  /**
   * question_log_question findMany
   */
  export type question_log_questionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter, which question_log_questions to fetch.
     */
    where?: question_log_questionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_log_questions to fetch.
     */
    orderBy?: question_log_questionOrderByWithRelationInput | question_log_questionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing question_log_questions.
     */
    cursor?: question_log_questionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_log_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_log_questions.
     */
    skip?: number
    distinct?: Question_log_questionScalarFieldEnum | Question_log_questionScalarFieldEnum[]
  }

  /**
   * question_log_question create
   */
  export type question_log_questionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * The data needed to create a question_log_question.
     */
    data: XOR<question_log_questionCreateInput, question_log_questionUncheckedCreateInput>
  }

  /**
   * question_log_question createMany
   */
  export type question_log_questionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many question_log_questions.
     */
    data: question_log_questionCreateManyInput | question_log_questionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * question_log_question createManyAndReturn
   */
  export type question_log_questionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * The data used to create many question_log_questions.
     */
    data: question_log_questionCreateManyInput | question_log_questionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log_question update
   */
  export type question_log_questionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * The data needed to update a question_log_question.
     */
    data: XOR<question_log_questionUpdateInput, question_log_questionUncheckedUpdateInput>
    /**
     * Choose, which question_log_question to update.
     */
    where: question_log_questionWhereUniqueInput
  }

  /**
   * question_log_question updateMany
   */
  export type question_log_questionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update question_log_questions.
     */
    data: XOR<question_log_questionUpdateManyMutationInput, question_log_questionUncheckedUpdateManyInput>
    /**
     * Filter which question_log_questions to update
     */
    where?: question_log_questionWhereInput
    /**
     * Limit how many question_log_questions to update.
     */
    limit?: number
  }

  /**
   * question_log_question updateManyAndReturn
   */
  export type question_log_questionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * The data used to update question_log_questions.
     */
    data: XOR<question_log_questionUpdateManyMutationInput, question_log_questionUncheckedUpdateManyInput>
    /**
     * Filter which question_log_questions to update
     */
    where?: question_log_questionWhereInput
    /**
     * Limit how many question_log_questions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_log_question upsert
   */
  export type question_log_questionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * The filter to search for the question_log_question to update in case it exists.
     */
    where: question_log_questionWhereUniqueInput
    /**
     * In case the question_log_question found by the `where` argument doesn't exist, create a new question_log_question with this data.
     */
    create: XOR<question_log_questionCreateInput, question_log_questionUncheckedCreateInput>
    /**
     * In case the question_log_question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<question_log_questionUpdateInput, question_log_questionUncheckedUpdateInput>
  }

  /**
   * question_log_question delete
   */
  export type question_log_questionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
    /**
     * Filter which question_log_question to delete.
     */
    where: question_log_questionWhereUniqueInput
  }

  /**
   * question_log_question deleteMany
   */
  export type question_log_questionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_log_questions to delete
     */
    where?: question_log_questionWhereInput
    /**
     * Limit how many question_log_questions to delete.
     */
    limit?: number
  }

  /**
   * question_log_question.question_keyword
   */
  export type question_log_question$question_keywordArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    where?: question_keywordWhereInput
    orderBy?: question_keywordOrderByWithRelationInput | question_keywordOrderByWithRelationInput[]
    cursor?: question_keywordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Question_keywordScalarFieldEnum | Question_keywordScalarFieldEnum[]
  }

  /**
   * question_log_question without action
   */
  export type question_log_questionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_log_question
     */
    select?: question_log_questionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_log_question
     */
    omit?: question_log_questionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_log_questionInclude<ExtArgs> | null
  }


  /**
   * Model question_keyword
   */

  export type AggregateQuestion_keyword = {
    _count: Question_keywordCountAggregateOutputType | null
    _avg: Question_keywordAvgAggregateOutputType | null
    _sum: Question_keywordSumAggregateOutputType | null
    _min: Question_keywordMinAggregateOutputType | null
    _max: Question_keywordMaxAggregateOutputType | null
  }

  export type Question_keywordAvgAggregateOutputType = {
    id: number | null
    question_id: number | null
  }

  export type Question_keywordSumAggregateOutputType = {
    id: number | null
    question_id: number | null
  }

  export type Question_keywordMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    keyword: string | null
    question_id: number | null
    uuid: string | null
    explanation: string | null
    example: string | null
  }

  export type Question_keywordMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    keyword: string | null
    question_id: number | null
    uuid: string | null
    explanation: string | null
    example: string | null
  }

  export type Question_keywordCountAggregateOutputType = {
    id: number
    created_at: number
    keyword: number
    question_id: number
    uuid: number
    explanation: number
    example: number
    _all: number
  }


  export type Question_keywordAvgAggregateInputType = {
    id?: true
    question_id?: true
  }

  export type Question_keywordSumAggregateInputType = {
    id?: true
    question_id?: true
  }

  export type Question_keywordMinAggregateInputType = {
    id?: true
    created_at?: true
    keyword?: true
    question_id?: true
    uuid?: true
    explanation?: true
    example?: true
  }

  export type Question_keywordMaxAggregateInputType = {
    id?: true
    created_at?: true
    keyword?: true
    question_id?: true
    uuid?: true
    explanation?: true
    example?: true
  }

  export type Question_keywordCountAggregateInputType = {
    id?: true
    created_at?: true
    keyword?: true
    question_id?: true
    uuid?: true
    explanation?: true
    example?: true
    _all?: true
  }

  export type Question_keywordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_keyword to aggregate.
     */
    where?: question_keywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_keywords to fetch.
     */
    orderBy?: question_keywordOrderByWithRelationInput | question_keywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: question_keywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned question_keywords
    **/
    _count?: true | Question_keywordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Question_keywordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Question_keywordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Question_keywordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Question_keywordMaxAggregateInputType
  }

  export type GetQuestion_keywordAggregateType<T extends Question_keywordAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion_keyword]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion_keyword[P]>
      : GetScalarType<T[P], AggregateQuestion_keyword[P]>
  }




  export type question_keywordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: question_keywordWhereInput
    orderBy?: question_keywordOrderByWithAggregationInput | question_keywordOrderByWithAggregationInput[]
    by: Question_keywordScalarFieldEnum[] | Question_keywordScalarFieldEnum
    having?: question_keywordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Question_keywordCountAggregateInputType | true
    _avg?: Question_keywordAvgAggregateInputType
    _sum?: Question_keywordSumAggregateInputType
    _min?: Question_keywordMinAggregateInputType
    _max?: Question_keywordMaxAggregateInputType
  }

  export type Question_keywordGroupByOutputType = {
    id: number
    created_at: Date
    keyword: string
    question_id: number
    uuid: string
    explanation: string | null
    example: string | null
    _count: Question_keywordCountAggregateOutputType | null
    _avg: Question_keywordAvgAggregateOutputType | null
    _sum: Question_keywordSumAggregateOutputType | null
    _min: Question_keywordMinAggregateOutputType | null
    _max: Question_keywordMaxAggregateOutputType | null
  }

  type GetQuestion_keywordGroupByPayload<T extends question_keywordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Question_keywordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Question_keywordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Question_keywordGroupByOutputType[P]>
            : GetScalarType<T[P], Question_keywordGroupByOutputType[P]>
        }
      >
    >


  export type question_keywordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    keyword?: boolean
    question_id?: boolean
    uuid?: boolean
    explanation?: boolean
    example?: boolean
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_keyword"]>

  export type question_keywordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    keyword?: boolean
    question_id?: boolean
    uuid?: boolean
    explanation?: boolean
    example?: boolean
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_keyword"]>

  export type question_keywordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    keyword?: boolean
    question_id?: boolean
    uuid?: boolean
    explanation?: boolean
    example?: boolean
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question_keyword"]>

  export type question_keywordSelectScalar = {
    id?: boolean
    created_at?: boolean
    keyword?: boolean
    question_id?: boolean
    uuid?: boolean
    explanation?: boolean
    example?: boolean
  }

  export type question_keywordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "keyword" | "question_id" | "uuid" | "explanation" | "example", ExtArgs["result"]["question_keyword"]>
  export type question_keywordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }
  export type question_keywordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }
  export type question_keywordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question_log_question?: boolean | question_log_questionDefaultArgs<ExtArgs>
  }

  export type $question_keywordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "question_keyword"
    objects: {
      question_log_question: Prisma.$question_log_questionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date
      keyword: string
      question_id: number
      uuid: string
      explanation: string | null
      example: string | null
    }, ExtArgs["result"]["question_keyword"]>
    composites: {}
  }

  type question_keywordGetPayload<S extends boolean | null | undefined | question_keywordDefaultArgs> = $Result.GetResult<Prisma.$question_keywordPayload, S>

  type question_keywordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<question_keywordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Question_keywordCountAggregateInputType | true
    }

  export interface question_keywordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['question_keyword'], meta: { name: 'question_keyword' } }
    /**
     * Find zero or one Question_keyword that matches the filter.
     * @param {question_keywordFindUniqueArgs} args - Arguments to find a Question_keyword
     * @example
     * // Get one Question_keyword
     * const question_keyword = await prisma.question_keyword.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends question_keywordFindUniqueArgs>(args: SelectSubset<T, question_keywordFindUniqueArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question_keyword that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {question_keywordFindUniqueOrThrowArgs} args - Arguments to find a Question_keyword
     * @example
     * // Get one Question_keyword
     * const question_keyword = await prisma.question_keyword.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends question_keywordFindUniqueOrThrowArgs>(args: SelectSubset<T, question_keywordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_keyword that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordFindFirstArgs} args - Arguments to find a Question_keyword
     * @example
     * // Get one Question_keyword
     * const question_keyword = await prisma.question_keyword.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends question_keywordFindFirstArgs>(args?: SelectSubset<T, question_keywordFindFirstArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question_keyword that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordFindFirstOrThrowArgs} args - Arguments to find a Question_keyword
     * @example
     * // Get one Question_keyword
     * const question_keyword = await prisma.question_keyword.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends question_keywordFindFirstOrThrowArgs>(args?: SelectSubset<T, question_keywordFindFirstOrThrowArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Question_keywords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Question_keywords
     * const question_keywords = await prisma.question_keyword.findMany()
     * 
     * // Get first 10 Question_keywords
     * const question_keywords = await prisma.question_keyword.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const question_keywordWithIdOnly = await prisma.question_keyword.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends question_keywordFindManyArgs>(args?: SelectSubset<T, question_keywordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question_keyword.
     * @param {question_keywordCreateArgs} args - Arguments to create a Question_keyword.
     * @example
     * // Create one Question_keyword
     * const Question_keyword = await prisma.question_keyword.create({
     *   data: {
     *     // ... data to create a Question_keyword
     *   }
     * })
     * 
     */
    create<T extends question_keywordCreateArgs>(args: SelectSubset<T, question_keywordCreateArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Question_keywords.
     * @param {question_keywordCreateManyArgs} args - Arguments to create many Question_keywords.
     * @example
     * // Create many Question_keywords
     * const question_keyword = await prisma.question_keyword.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends question_keywordCreateManyArgs>(args?: SelectSubset<T, question_keywordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Question_keywords and returns the data saved in the database.
     * @param {question_keywordCreateManyAndReturnArgs} args - Arguments to create many Question_keywords.
     * @example
     * // Create many Question_keywords
     * const question_keyword = await prisma.question_keyword.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Question_keywords and only return the `id`
     * const question_keywordWithIdOnly = await prisma.question_keyword.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends question_keywordCreateManyAndReturnArgs>(args?: SelectSubset<T, question_keywordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Question_keyword.
     * @param {question_keywordDeleteArgs} args - Arguments to delete one Question_keyword.
     * @example
     * // Delete one Question_keyword
     * const Question_keyword = await prisma.question_keyword.delete({
     *   where: {
     *     // ... filter to delete one Question_keyword
     *   }
     * })
     * 
     */
    delete<T extends question_keywordDeleteArgs>(args: SelectSubset<T, question_keywordDeleteArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question_keyword.
     * @param {question_keywordUpdateArgs} args - Arguments to update one Question_keyword.
     * @example
     * // Update one Question_keyword
     * const question_keyword = await prisma.question_keyword.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends question_keywordUpdateArgs>(args: SelectSubset<T, question_keywordUpdateArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Question_keywords.
     * @param {question_keywordDeleteManyArgs} args - Arguments to filter Question_keywords to delete.
     * @example
     * // Delete a few Question_keywords
     * const { count } = await prisma.question_keyword.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends question_keywordDeleteManyArgs>(args?: SelectSubset<T, question_keywordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_keywords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Question_keywords
     * const question_keyword = await prisma.question_keyword.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends question_keywordUpdateManyArgs>(args: SelectSubset<T, question_keywordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Question_keywords and returns the data updated in the database.
     * @param {question_keywordUpdateManyAndReturnArgs} args - Arguments to update many Question_keywords.
     * @example
     * // Update many Question_keywords
     * const question_keyword = await prisma.question_keyword.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Question_keywords and only return the `id`
     * const question_keywordWithIdOnly = await prisma.question_keyword.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends question_keywordUpdateManyAndReturnArgs>(args: SelectSubset<T, question_keywordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Question_keyword.
     * @param {question_keywordUpsertArgs} args - Arguments to update or create a Question_keyword.
     * @example
     * // Update or create a Question_keyword
     * const question_keyword = await prisma.question_keyword.upsert({
     *   create: {
     *     // ... data to create a Question_keyword
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question_keyword we want to update
     *   }
     * })
     */
    upsert<T extends question_keywordUpsertArgs>(args: SelectSubset<T, question_keywordUpsertArgs<ExtArgs>>): Prisma__question_keywordClient<$Result.GetResult<Prisma.$question_keywordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Question_keywords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordCountArgs} args - Arguments to filter Question_keywords to count.
     * @example
     * // Count the number of Question_keywords
     * const count = await prisma.question_keyword.count({
     *   where: {
     *     // ... the filter for the Question_keywords we want to count
     *   }
     * })
    **/
    count<T extends question_keywordCountArgs>(
      args?: Subset<T, question_keywordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Question_keywordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question_keyword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Question_keywordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Question_keywordAggregateArgs>(args: Subset<T, Question_keywordAggregateArgs>): Prisma.PrismaPromise<GetQuestion_keywordAggregateType<T>>

    /**
     * Group by Question_keyword.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {question_keywordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends question_keywordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: question_keywordGroupByArgs['orderBy'] }
        : { orderBy?: question_keywordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, question_keywordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestion_keywordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the question_keyword model
   */
  readonly fields: question_keywordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for question_keyword.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__question_keywordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question_log_question<T extends question_log_questionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, question_log_questionDefaultArgs<ExtArgs>>): Prisma__question_log_questionClient<$Result.GetResult<Prisma.$question_log_questionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the question_keyword model
   */
  interface question_keywordFieldRefs {
    readonly id: FieldRef<"question_keyword", 'Int'>
    readonly created_at: FieldRef<"question_keyword", 'DateTime'>
    readonly keyword: FieldRef<"question_keyword", 'String'>
    readonly question_id: FieldRef<"question_keyword", 'Int'>
    readonly uuid: FieldRef<"question_keyword", 'String'>
    readonly explanation: FieldRef<"question_keyword", 'String'>
    readonly example: FieldRef<"question_keyword", 'String'>
  }
    

  // Custom InputTypes
  /**
   * question_keyword findUnique
   */
  export type question_keywordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter, which question_keyword to fetch.
     */
    where: question_keywordWhereUniqueInput
  }

  /**
   * question_keyword findUniqueOrThrow
   */
  export type question_keywordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter, which question_keyword to fetch.
     */
    where: question_keywordWhereUniqueInput
  }

  /**
   * question_keyword findFirst
   */
  export type question_keywordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter, which question_keyword to fetch.
     */
    where?: question_keywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_keywords to fetch.
     */
    orderBy?: question_keywordOrderByWithRelationInput | question_keywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_keywords.
     */
    cursor?: question_keywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_keywords.
     */
    distinct?: Question_keywordScalarFieldEnum | Question_keywordScalarFieldEnum[]
  }

  /**
   * question_keyword findFirstOrThrow
   */
  export type question_keywordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter, which question_keyword to fetch.
     */
    where?: question_keywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_keywords to fetch.
     */
    orderBy?: question_keywordOrderByWithRelationInput | question_keywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for question_keywords.
     */
    cursor?: question_keywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_keywords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of question_keywords.
     */
    distinct?: Question_keywordScalarFieldEnum | Question_keywordScalarFieldEnum[]
  }

  /**
   * question_keyword findMany
   */
  export type question_keywordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter, which question_keywords to fetch.
     */
    where?: question_keywordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of question_keywords to fetch.
     */
    orderBy?: question_keywordOrderByWithRelationInput | question_keywordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing question_keywords.
     */
    cursor?: question_keywordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` question_keywords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` question_keywords.
     */
    skip?: number
    distinct?: Question_keywordScalarFieldEnum | Question_keywordScalarFieldEnum[]
  }

  /**
   * question_keyword create
   */
  export type question_keywordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * The data needed to create a question_keyword.
     */
    data: XOR<question_keywordCreateInput, question_keywordUncheckedCreateInput>
  }

  /**
   * question_keyword createMany
   */
  export type question_keywordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many question_keywords.
     */
    data: question_keywordCreateManyInput | question_keywordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * question_keyword createManyAndReturn
   */
  export type question_keywordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * The data used to create many question_keywords.
     */
    data: question_keywordCreateManyInput | question_keywordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_keyword update
   */
  export type question_keywordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * The data needed to update a question_keyword.
     */
    data: XOR<question_keywordUpdateInput, question_keywordUncheckedUpdateInput>
    /**
     * Choose, which question_keyword to update.
     */
    where: question_keywordWhereUniqueInput
  }

  /**
   * question_keyword updateMany
   */
  export type question_keywordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update question_keywords.
     */
    data: XOR<question_keywordUpdateManyMutationInput, question_keywordUncheckedUpdateManyInput>
    /**
     * Filter which question_keywords to update
     */
    where?: question_keywordWhereInput
    /**
     * Limit how many question_keywords to update.
     */
    limit?: number
  }

  /**
   * question_keyword updateManyAndReturn
   */
  export type question_keywordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * The data used to update question_keywords.
     */
    data: XOR<question_keywordUpdateManyMutationInput, question_keywordUncheckedUpdateManyInput>
    /**
     * Filter which question_keywords to update
     */
    where?: question_keywordWhereInput
    /**
     * Limit how many question_keywords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * question_keyword upsert
   */
  export type question_keywordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * The filter to search for the question_keyword to update in case it exists.
     */
    where: question_keywordWhereUniqueInput
    /**
     * In case the question_keyword found by the `where` argument doesn't exist, create a new question_keyword with this data.
     */
    create: XOR<question_keywordCreateInput, question_keywordUncheckedCreateInput>
    /**
     * In case the question_keyword was found with the provided `where` argument, update it with this data.
     */
    update: XOR<question_keywordUpdateInput, question_keywordUncheckedUpdateInput>
  }

  /**
   * question_keyword delete
   */
  export type question_keywordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
    /**
     * Filter which question_keyword to delete.
     */
    where: question_keywordWhereUniqueInput
  }

  /**
   * question_keyword deleteMany
   */
  export type question_keywordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which question_keywords to delete
     */
    where?: question_keywordWhereInput
    /**
     * Limit how many question_keywords to delete.
     */
    limit?: number
  }

  /**
   * question_keyword without action
   */
  export type question_keywordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the question_keyword
     */
    select?: question_keywordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the question_keyword
     */
    omit?: question_keywordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: question_keywordInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    uuid: 'uuid'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const ParticipantScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    email: 'email',
    name: 'name',
    google_id: 'google_id',
    uuid: 'uuid'
  };

  export type ParticipantScalarFieldEnum = (typeof ParticipantScalarFieldEnum)[keyof typeof ParticipantScalarFieldEnum]


  export const TopicScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    department: 'department',
    uuid: 'uuid'
  };

  export type TopicScalarFieldEnum = (typeof TopicScalarFieldEnum)[keyof typeof TopicScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    email: 'email',
    name: 'name',
    uuid: 'uuid'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const Question_logScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    uuid: 'uuid',
    department: 'department',
    participant: 'participant',
    timer: 'timer',
    question_count: 'question_count',
    difficulty: 'difficulty',
    completed: 'completed',
    total_answers: 'total_answers',
    total_correct: 'total_correct',
    score: 'score',
    end_time: 'end_time',
    timezone_offset: 'timezone_offset',
    timezone_name: 'timezone_name'
  };

  export type Question_logScalarFieldEnum = (typeof Question_logScalarFieldEnum)[keyof typeof Question_logScalarFieldEnum]


  export const Question_log_topicScalarFieldEnum: {
    question_log_id: 'question_log_id',
    topic_id: 'topic_id'
  };

  export type Question_log_topicScalarFieldEnum = (typeof Question_log_topicScalarFieldEnum)[keyof typeof Question_log_topicScalarFieldEnum]


  export const Question_log_questionScalarFieldEnum: {
    id: 'id',
    question_log_id: 'question_log_id',
    question: 'question',
    options: 'options',
    answer: 'answer',
    explanation: 'explanation',
    topic: 'topic',
    selected_answer: 'selected_answer',
    question_type: 'question_type',
    created_at: 'created_at',
    uuid: 'uuid'
  };

  export type Question_log_questionScalarFieldEnum = (typeof Question_log_questionScalarFieldEnum)[keyof typeof Question_log_questionScalarFieldEnum]


  export const Question_keywordScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    keyword: 'keyword',
    question_id: 'question_id',
    uuid: 'uuid',
    explanation: 'explanation',
    example: 'example'
  };

  export type Question_keywordScalarFieldEnum = (typeof Question_keywordScalarFieldEnum)[keyof typeof Question_keywordScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'QuestionType[]'
   */
  export type ListEnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type departmentWhereInput = {
    AND?: departmentWhereInput | departmentWhereInput[]
    OR?: departmentWhereInput[]
    NOT?: departmentWhereInput | departmentWhereInput[]
    id?: IntFilter<"department"> | number
    created_at?: DateTimeFilter<"department"> | Date | string
    name?: StringNullableFilter<"department"> | string | null
    uuid?: UuidNullableFilter<"department"> | string | null
    topic_topic_departmentTodepartment?: TopicListRelationFilter
    question_log_question_department?: Question_logListRelationFilter
  }

  export type departmentOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    uuid?: SortOrderInput | SortOrder
    topic_topic_departmentTodepartment?: topicOrderByRelationAggregateInput
    question_log_question_department?: question_logOrderByRelationAggregateInput
  }

  export type departmentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    uuid?: string
    AND?: departmentWhereInput | departmentWhereInput[]
    OR?: departmentWhereInput[]
    NOT?: departmentWhereInput | departmentWhereInput[]
    created_at?: DateTimeFilter<"department"> | Date | string
    topic_topic_departmentTodepartment?: TopicListRelationFilter
    question_log_question_department?: Question_logListRelationFilter
  }, "id" | "name" | "uuid">

  export type departmentOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    uuid?: SortOrderInput | SortOrder
    _count?: departmentCountOrderByAggregateInput
    _avg?: departmentAvgOrderByAggregateInput
    _max?: departmentMaxOrderByAggregateInput
    _min?: departmentMinOrderByAggregateInput
    _sum?: departmentSumOrderByAggregateInput
  }

  export type departmentScalarWhereWithAggregatesInput = {
    AND?: departmentScalarWhereWithAggregatesInput | departmentScalarWhereWithAggregatesInput[]
    OR?: departmentScalarWhereWithAggregatesInput[]
    NOT?: departmentScalarWhereWithAggregatesInput | departmentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"department"> | number
    created_at?: DateTimeWithAggregatesFilter<"department"> | Date | string
    name?: StringNullableWithAggregatesFilter<"department"> | string | null
    uuid?: UuidNullableWithAggregatesFilter<"department"> | string | null
  }

  export type participantWhereInput = {
    AND?: participantWhereInput | participantWhereInput[]
    OR?: participantWhereInput[]
    NOT?: participantWhereInput | participantWhereInput[]
    id?: IntFilter<"participant"> | number
    created_at?: DateTimeFilter<"participant"> | Date | string
    email?: StringFilter<"participant"> | string
    name?: StringFilter<"participant"> | string
    google_id?: StringFilter<"participant"> | string
    uuid?: UuidFilter<"participant"> | string
    question_log?: Question_logListRelationFilter
  }

  export type participantOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    google_id?: SortOrder
    uuid?: SortOrder
    question_log?: question_logOrderByRelationAggregateInput
  }

  export type participantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: participantWhereInput | participantWhereInput[]
    OR?: participantWhereInput[]
    NOT?: participantWhereInput | participantWhereInput[]
    created_at?: DateTimeFilter<"participant"> | Date | string
    email?: StringFilter<"participant"> | string
    name?: StringFilter<"participant"> | string
    google_id?: StringFilter<"participant"> | string
    question_log?: Question_logListRelationFilter
  }, "id" | "uuid">

  export type participantOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    google_id?: SortOrder
    uuid?: SortOrder
    _count?: participantCountOrderByAggregateInput
    _avg?: participantAvgOrderByAggregateInput
    _max?: participantMaxOrderByAggregateInput
    _min?: participantMinOrderByAggregateInput
    _sum?: participantSumOrderByAggregateInput
  }

  export type participantScalarWhereWithAggregatesInput = {
    AND?: participantScalarWhereWithAggregatesInput | participantScalarWhereWithAggregatesInput[]
    OR?: participantScalarWhereWithAggregatesInput[]
    NOT?: participantScalarWhereWithAggregatesInput | participantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"participant"> | number
    created_at?: DateTimeWithAggregatesFilter<"participant"> | Date | string
    email?: StringWithAggregatesFilter<"participant"> | string
    name?: StringWithAggregatesFilter<"participant"> | string
    google_id?: StringWithAggregatesFilter<"participant"> | string
    uuid?: UuidWithAggregatesFilter<"participant"> | string
  }

  export type topicWhereInput = {
    AND?: topicWhereInput | topicWhereInput[]
    OR?: topicWhereInput[]
    NOT?: topicWhereInput | topicWhereInput[]
    id?: IntFilter<"topic"> | number
    created_at?: DateTimeFilter<"topic"> | Date | string
    name?: StringNullableFilter<"topic"> | string | null
    department?: IntNullableFilter<"topic"> | number | null
    uuid?: UuidFilter<"topic"> | string
    department_topic_departmentTodepartment?: XOR<DepartmentNullableScalarRelationFilter, departmentWhereInput> | null
    question_logs?: Question_log_topicListRelationFilter
  }

  export type topicOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    uuid?: SortOrder
    department_topic_departmentTodepartment?: departmentOrderByWithRelationInput
    question_logs?: question_log_topicOrderByRelationAggregateInput
  }

  export type topicWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: topicWhereInput | topicWhereInput[]
    OR?: topicWhereInput[]
    NOT?: topicWhereInput | topicWhereInput[]
    created_at?: DateTimeFilter<"topic"> | Date | string
    name?: StringNullableFilter<"topic"> | string | null
    department?: IntNullableFilter<"topic"> | number | null
    department_topic_departmentTodepartment?: XOR<DepartmentNullableScalarRelationFilter, departmentWhereInput> | null
    question_logs?: Question_log_topicListRelationFilter
  }, "id" | "uuid">

  export type topicOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    department?: SortOrderInput | SortOrder
    uuid?: SortOrder
    _count?: topicCountOrderByAggregateInput
    _avg?: topicAvgOrderByAggregateInput
    _max?: topicMaxOrderByAggregateInput
    _min?: topicMinOrderByAggregateInput
    _sum?: topicSumOrderByAggregateInput
  }

  export type topicScalarWhereWithAggregatesInput = {
    AND?: topicScalarWhereWithAggregatesInput | topicScalarWhereWithAggregatesInput[]
    OR?: topicScalarWhereWithAggregatesInput[]
    NOT?: topicScalarWhereWithAggregatesInput | topicScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"topic"> | number
    created_at?: DateTimeWithAggregatesFilter<"topic"> | Date | string
    name?: StringNullableWithAggregatesFilter<"topic"> | string | null
    department?: IntNullableWithAggregatesFilter<"topic"> | number | null
    uuid?: UuidWithAggregatesFilter<"topic"> | string
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: IntFilter<"user"> | number
    created_at?: DateTimeFilter<"user"> | Date | string
    email?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    uuid?: UuidFilter<"user"> | string
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    created_at?: DateTimeFilter<"user"> | Date | string
    email?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
  }, "id" | "uuid">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
    _count?: userCountOrderByAggregateInput
    _avg?: userAvgOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
    _sum?: userSumOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"user"> | number
    created_at?: DateTimeWithAggregatesFilter<"user"> | Date | string
    email?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    uuid?: UuidWithAggregatesFilter<"user"> | string
  }

  export type question_logWhereInput = {
    AND?: question_logWhereInput | question_logWhereInput[]
    OR?: question_logWhereInput[]
    NOT?: question_logWhereInput | question_logWhereInput[]
    id?: IntFilter<"question_log"> | number
    created_at?: DateTimeFilter<"question_log"> | Date | string
    uuid?: UuidFilter<"question_log"> | string
    department?: IntFilter<"question_log"> | number
    participant?: IntFilter<"question_log"> | number
    timer?: IntFilter<"question_log"> | number
    question_count?: IntFilter<"question_log"> | number
    difficulty?: StringFilter<"question_log"> | string
    completed?: BoolFilter<"question_log"> | boolean
    total_answers?: IntFilter<"question_log"> | number
    total_correct?: IntFilter<"question_log"> | number
    score?: IntFilter<"question_log"> | number
    end_time?: DateTimeNullableFilter<"question_log"> | Date | string | null
    timezone_offset?: IntNullableFilter<"question_log"> | number | null
    timezone_name?: StringNullableFilter<"question_log"> | string | null
    question_generator?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
    question_department?: XOR<DepartmentScalarRelationFilter, departmentWhereInput>
    topics?: Question_log_topicListRelationFilter
    question_log_question?: Question_log_questionListRelationFilter
  }

  export type question_logOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    difficulty?: SortOrder
    completed?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    end_time?: SortOrderInput | SortOrder
    timezone_offset?: SortOrderInput | SortOrder
    timezone_name?: SortOrderInput | SortOrder
    question_generator?: participantOrderByWithRelationInput
    question_department?: departmentOrderByWithRelationInput
    topics?: question_log_topicOrderByRelationAggregateInput
    question_log_question?: question_log_questionOrderByRelationAggregateInput
  }

  export type question_logWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: question_logWhereInput | question_logWhereInput[]
    OR?: question_logWhereInput[]
    NOT?: question_logWhereInput | question_logWhereInput[]
    created_at?: DateTimeFilter<"question_log"> | Date | string
    department?: IntFilter<"question_log"> | number
    participant?: IntFilter<"question_log"> | number
    timer?: IntFilter<"question_log"> | number
    question_count?: IntFilter<"question_log"> | number
    difficulty?: StringFilter<"question_log"> | string
    completed?: BoolFilter<"question_log"> | boolean
    total_answers?: IntFilter<"question_log"> | number
    total_correct?: IntFilter<"question_log"> | number
    score?: IntFilter<"question_log"> | number
    end_time?: DateTimeNullableFilter<"question_log"> | Date | string | null
    timezone_offset?: IntNullableFilter<"question_log"> | number | null
    timezone_name?: StringNullableFilter<"question_log"> | string | null
    question_generator?: XOR<ParticipantScalarRelationFilter, participantWhereInput>
    question_department?: XOR<DepartmentScalarRelationFilter, departmentWhereInput>
    topics?: Question_log_topicListRelationFilter
    question_log_question?: Question_log_questionListRelationFilter
  }, "id" | "uuid">

  export type question_logOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    difficulty?: SortOrder
    completed?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    end_time?: SortOrderInput | SortOrder
    timezone_offset?: SortOrderInput | SortOrder
    timezone_name?: SortOrderInput | SortOrder
    _count?: question_logCountOrderByAggregateInput
    _avg?: question_logAvgOrderByAggregateInput
    _max?: question_logMaxOrderByAggregateInput
    _min?: question_logMinOrderByAggregateInput
    _sum?: question_logSumOrderByAggregateInput
  }

  export type question_logScalarWhereWithAggregatesInput = {
    AND?: question_logScalarWhereWithAggregatesInput | question_logScalarWhereWithAggregatesInput[]
    OR?: question_logScalarWhereWithAggregatesInput[]
    NOT?: question_logScalarWhereWithAggregatesInput | question_logScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"question_log"> | number
    created_at?: DateTimeWithAggregatesFilter<"question_log"> | Date | string
    uuid?: UuidWithAggregatesFilter<"question_log"> | string
    department?: IntWithAggregatesFilter<"question_log"> | number
    participant?: IntWithAggregatesFilter<"question_log"> | number
    timer?: IntWithAggregatesFilter<"question_log"> | number
    question_count?: IntWithAggregatesFilter<"question_log"> | number
    difficulty?: StringWithAggregatesFilter<"question_log"> | string
    completed?: BoolWithAggregatesFilter<"question_log"> | boolean
    total_answers?: IntWithAggregatesFilter<"question_log"> | number
    total_correct?: IntWithAggregatesFilter<"question_log"> | number
    score?: IntWithAggregatesFilter<"question_log"> | number
    end_time?: DateTimeNullableWithAggregatesFilter<"question_log"> | Date | string | null
    timezone_offset?: IntNullableWithAggregatesFilter<"question_log"> | number | null
    timezone_name?: StringNullableWithAggregatesFilter<"question_log"> | string | null
  }

  export type question_log_topicWhereInput = {
    AND?: question_log_topicWhereInput | question_log_topicWhereInput[]
    OR?: question_log_topicWhereInput[]
    NOT?: question_log_topicWhereInput | question_log_topicWhereInput[]
    question_log_id?: IntFilter<"question_log_topic"> | number
    topic_id?: IntFilter<"question_log_topic"> | number
    question_log?: XOR<Question_logScalarRelationFilter, question_logWhereInput>
    topic?: XOR<TopicScalarRelationFilter, topicWhereInput>
  }

  export type question_log_topicOrderByWithRelationInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
    question_log?: question_logOrderByWithRelationInput
    topic?: topicOrderByWithRelationInput
  }

  export type question_log_topicWhereUniqueInput = Prisma.AtLeast<{
    question_log_id_topic_id?: question_log_topicQuestion_log_idTopic_idCompoundUniqueInput
    AND?: question_log_topicWhereInput | question_log_topicWhereInput[]
    OR?: question_log_topicWhereInput[]
    NOT?: question_log_topicWhereInput | question_log_topicWhereInput[]
    question_log_id?: IntFilter<"question_log_topic"> | number
    topic_id?: IntFilter<"question_log_topic"> | number
    question_log?: XOR<Question_logScalarRelationFilter, question_logWhereInput>
    topic?: XOR<TopicScalarRelationFilter, topicWhereInput>
  }, "question_log_id_topic_id">

  export type question_log_topicOrderByWithAggregationInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
    _count?: question_log_topicCountOrderByAggregateInput
    _avg?: question_log_topicAvgOrderByAggregateInput
    _max?: question_log_topicMaxOrderByAggregateInput
    _min?: question_log_topicMinOrderByAggregateInput
    _sum?: question_log_topicSumOrderByAggregateInput
  }

  export type question_log_topicScalarWhereWithAggregatesInput = {
    AND?: question_log_topicScalarWhereWithAggregatesInput | question_log_topicScalarWhereWithAggregatesInput[]
    OR?: question_log_topicScalarWhereWithAggregatesInput[]
    NOT?: question_log_topicScalarWhereWithAggregatesInput | question_log_topicScalarWhereWithAggregatesInput[]
    question_log_id?: IntWithAggregatesFilter<"question_log_topic"> | number
    topic_id?: IntWithAggregatesFilter<"question_log_topic"> | number
  }

  export type question_log_questionWhereInput = {
    AND?: question_log_questionWhereInput | question_log_questionWhereInput[]
    OR?: question_log_questionWhereInput[]
    NOT?: question_log_questionWhereInput | question_log_questionWhereInput[]
    id?: IntFilter<"question_log_question"> | number
    question_log_id?: IntFilter<"question_log_question"> | number
    question?: StringFilter<"question_log_question"> | string
    options?: StringNullableListFilter<"question_log_question">
    answer?: IntNullableListFilter<"question_log_question">
    explanation?: StringNullableFilter<"question_log_question"> | string | null
    topic?: StringNullableFilter<"question_log_question"> | string | null
    selected_answer?: IntNullableListFilter<"question_log_question">
    question_type?: EnumQuestionTypeFilter<"question_log_question"> | $Enums.QuestionType
    created_at?: DateTimeFilter<"question_log_question"> | Date | string
    uuid?: UuidFilter<"question_log_question"> | string
    question_log?: XOR<Question_logScalarRelationFilter, question_logWhereInput>
    question_keyword?: Question_keywordListRelationFilter
  }

  export type question_log_questionOrderByWithRelationInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    explanation?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    selected_answer?: SortOrder
    question_type?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    question_log?: question_logOrderByWithRelationInput
    question_keyword?: question_keywordOrderByRelationAggregateInput
  }

  export type question_log_questionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: question_log_questionWhereInput | question_log_questionWhereInput[]
    OR?: question_log_questionWhereInput[]
    NOT?: question_log_questionWhereInput | question_log_questionWhereInput[]
    question_log_id?: IntFilter<"question_log_question"> | number
    question?: StringFilter<"question_log_question"> | string
    options?: StringNullableListFilter<"question_log_question">
    answer?: IntNullableListFilter<"question_log_question">
    explanation?: StringNullableFilter<"question_log_question"> | string | null
    topic?: StringNullableFilter<"question_log_question"> | string | null
    selected_answer?: IntNullableListFilter<"question_log_question">
    question_type?: EnumQuestionTypeFilter<"question_log_question"> | $Enums.QuestionType
    created_at?: DateTimeFilter<"question_log_question"> | Date | string
    question_log?: XOR<Question_logScalarRelationFilter, question_logWhereInput>
    question_keyword?: Question_keywordListRelationFilter
  }, "id" | "uuid">

  export type question_log_questionOrderByWithAggregationInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    explanation?: SortOrderInput | SortOrder
    topic?: SortOrderInput | SortOrder
    selected_answer?: SortOrder
    question_type?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    _count?: question_log_questionCountOrderByAggregateInput
    _avg?: question_log_questionAvgOrderByAggregateInput
    _max?: question_log_questionMaxOrderByAggregateInput
    _min?: question_log_questionMinOrderByAggregateInput
    _sum?: question_log_questionSumOrderByAggregateInput
  }

  export type question_log_questionScalarWhereWithAggregatesInput = {
    AND?: question_log_questionScalarWhereWithAggregatesInput | question_log_questionScalarWhereWithAggregatesInput[]
    OR?: question_log_questionScalarWhereWithAggregatesInput[]
    NOT?: question_log_questionScalarWhereWithAggregatesInput | question_log_questionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"question_log_question"> | number
    question_log_id?: IntWithAggregatesFilter<"question_log_question"> | number
    question?: StringWithAggregatesFilter<"question_log_question"> | string
    options?: StringNullableListFilter<"question_log_question">
    answer?: IntNullableListFilter<"question_log_question">
    explanation?: StringNullableWithAggregatesFilter<"question_log_question"> | string | null
    topic?: StringNullableWithAggregatesFilter<"question_log_question"> | string | null
    selected_answer?: IntNullableListFilter<"question_log_question">
    question_type?: EnumQuestionTypeWithAggregatesFilter<"question_log_question"> | $Enums.QuestionType
    created_at?: DateTimeWithAggregatesFilter<"question_log_question"> | Date | string
    uuid?: UuidWithAggregatesFilter<"question_log_question"> | string
  }

  export type question_keywordWhereInput = {
    AND?: question_keywordWhereInput | question_keywordWhereInput[]
    OR?: question_keywordWhereInput[]
    NOT?: question_keywordWhereInput | question_keywordWhereInput[]
    id?: IntFilter<"question_keyword"> | number
    created_at?: DateTimeFilter<"question_keyword"> | Date | string
    keyword?: StringFilter<"question_keyword"> | string
    question_id?: IntFilter<"question_keyword"> | number
    uuid?: UuidFilter<"question_keyword"> | string
    explanation?: StringNullableFilter<"question_keyword"> | string | null
    example?: StringNullableFilter<"question_keyword"> | string | null
    question_log_question?: XOR<Question_log_questionScalarRelationFilter, question_log_questionWhereInput>
  }

  export type question_keywordOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    keyword?: SortOrder
    question_id?: SortOrder
    uuid?: SortOrder
    explanation?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    question_log_question?: question_log_questionOrderByWithRelationInput
  }

  export type question_keywordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: question_keywordWhereInput | question_keywordWhereInput[]
    OR?: question_keywordWhereInput[]
    NOT?: question_keywordWhereInput | question_keywordWhereInput[]
    created_at?: DateTimeFilter<"question_keyword"> | Date | string
    keyword?: StringFilter<"question_keyword"> | string
    question_id?: IntFilter<"question_keyword"> | number
    explanation?: StringNullableFilter<"question_keyword"> | string | null
    example?: StringNullableFilter<"question_keyword"> | string | null
    question_log_question?: XOR<Question_log_questionScalarRelationFilter, question_log_questionWhereInput>
  }, "id" | "uuid">

  export type question_keywordOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    keyword?: SortOrder
    question_id?: SortOrder
    uuid?: SortOrder
    explanation?: SortOrderInput | SortOrder
    example?: SortOrderInput | SortOrder
    _count?: question_keywordCountOrderByAggregateInput
    _avg?: question_keywordAvgOrderByAggregateInput
    _max?: question_keywordMaxOrderByAggregateInput
    _min?: question_keywordMinOrderByAggregateInput
    _sum?: question_keywordSumOrderByAggregateInput
  }

  export type question_keywordScalarWhereWithAggregatesInput = {
    AND?: question_keywordScalarWhereWithAggregatesInput | question_keywordScalarWhereWithAggregatesInput[]
    OR?: question_keywordScalarWhereWithAggregatesInput[]
    NOT?: question_keywordScalarWhereWithAggregatesInput | question_keywordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"question_keyword"> | number
    created_at?: DateTimeWithAggregatesFilter<"question_keyword"> | Date | string
    keyword?: StringWithAggregatesFilter<"question_keyword"> | string
    question_id?: IntWithAggregatesFilter<"question_keyword"> | number
    uuid?: UuidWithAggregatesFilter<"question_keyword"> | string
    explanation?: StringNullableWithAggregatesFilter<"question_keyword"> | string | null
    example?: StringNullableWithAggregatesFilter<"question_keyword"> | string | null
  }

  export type departmentCreateInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    topic_topic_departmentTodepartment?: topicCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput
    question_log_question_department?: question_logCreateNestedManyWithoutQuestion_departmentInput
  }

  export type departmentUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    topic_topic_departmentTodepartment?: topicUncheckedCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput
    question_log_question_department?: question_logUncheckedCreateNestedManyWithoutQuestion_departmentInput
  }

  export type departmentUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    topic_topic_departmentTodepartment?: topicUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput
    question_log_question_department?: question_logUpdateManyWithoutQuestion_departmentNestedInput
  }

  export type departmentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    topic_topic_departmentTodepartment?: topicUncheckedUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput
    question_log_question_department?: question_logUncheckedUpdateManyWithoutQuestion_departmentNestedInput
  }

  export type departmentCreateManyInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
  }

  export type departmentUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type departmentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type participantCreateInput = {
    created_at?: Date | string
    email: string
    name: string
    google_id?: string
    uuid?: string
    question_log?: question_logCreateNestedManyWithoutQuestion_generatorInput
  }

  export type participantUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    email: string
    name: string
    google_id?: string
    uuid?: string
    question_log?: question_logUncheckedCreateNestedManyWithoutQuestion_generatorInput
  }

  export type participantUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_log?: question_logUpdateManyWithoutQuestion_generatorNestedInput
  }

  export type participantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_log?: question_logUncheckedUpdateManyWithoutQuestion_generatorNestedInput
  }

  export type participantCreateManyInput = {
    id?: number
    created_at?: Date | string
    email: string
    name: string
    google_id?: string
    uuid?: string
  }

  export type participantUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type participantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type topicCreateInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string
    department_topic_departmentTodepartment?: departmentCreateNestedOneWithoutTopic_topic_departmentTodepartmentInput
    question_logs?: question_log_topicCreateNestedManyWithoutTopicInput
  }

  export type topicUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    department?: number | null
    uuid?: string
    question_logs?: question_log_topicUncheckedCreateNestedManyWithoutTopicInput
  }

  export type topicUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
    department_topic_departmentTodepartment?: departmentUpdateOneWithoutTopic_topic_departmentTodepartmentNestedInput
    question_logs?: question_log_topicUpdateManyWithoutTopicNestedInput
  }

  export type topicUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableIntFieldUpdateOperationsInput | number | null
    uuid?: StringFieldUpdateOperationsInput | string
    question_logs?: question_log_topicUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type topicCreateManyInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    department?: number | null
    uuid?: string
  }

  export type topicUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type topicUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableIntFieldUpdateOperationsInput | number | null
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateInput = {
    created_at?: Date | string
    email: string
    name: string
    uuid?: string
  }

  export type userUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    email: string
    name: string
    uuid?: string
  }

  export type userUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type userCreateManyInput = {
    id?: number
    created_at?: Date | string
    email: string
    name: string
    uuid?: string
  }

  export type userUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_logCreateInput = {
    created_at?: Date | string
    uuid?: string
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_generator: participantCreateNestedOneWithoutQuestion_logInput
    question_department: departmentCreateNestedOneWithoutQuestion_log_question_departmentInput
    topics?: question_log_topicCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    topics?: question_log_topicUncheckedCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionUncheckedCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_generator?: participantUpdateOneRequiredWithoutQuestion_logNestedInput
    question_department?: departmentUpdateOneRequiredWithoutQuestion_log_question_departmentNestedInput
    topics?: question_log_topicUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: question_log_topicUncheckedUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUncheckedUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logCreateManyInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
  }

  export type question_logUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_logUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_log_topicCreateInput = {
    question_log: question_logCreateNestedOneWithoutTopicsInput
    topic: topicCreateNestedOneWithoutQuestion_logsInput
  }

  export type question_log_topicUncheckedCreateInput = {
    question_log_id: number
    topic_id: number
  }

  export type question_log_topicUpdateInput = {
    question_log?: question_logUpdateOneRequiredWithoutTopicsNestedInput
    topic?: topicUpdateOneRequiredWithoutQuestion_logsNestedInput
  }

  export type question_log_topicUncheckedUpdateInput = {
    question_log_id?: IntFieldUpdateOperationsInput | number
    topic_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_topicCreateManyInput = {
    question_log_id: number
    topic_id: number
  }

  export type question_log_topicUpdateManyMutationInput = {

  }

  export type question_log_topicUncheckedUpdateManyInput = {
    question_log_id?: IntFieldUpdateOperationsInput | number
    topic_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_questionCreateInput = {
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
    question_log: question_logCreateNestedOneWithoutQuestion_log_questionInput
    question_keyword?: question_keywordCreateNestedManyWithoutQuestion_log_questionInput
  }

  export type question_log_questionUncheckedCreateInput = {
    id?: number
    question_log_id: number
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
    question_keyword?: question_keywordUncheckedCreateNestedManyWithoutQuestion_log_questionInput
  }

  export type question_log_questionUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_log?: question_logUpdateOneRequiredWithoutQuestion_log_questionNestedInput
    question_keyword?: question_keywordUpdateManyWithoutQuestion_log_questionNestedInput
  }

  export type question_log_questionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_log_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_keyword?: question_keywordUncheckedUpdateManyWithoutQuestion_log_questionNestedInput
  }

  export type question_log_questionCreateManyInput = {
    id?: number
    question_log_id: number
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
  }

  export type question_log_questionUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_log_questionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_log_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_keywordCreateInput = {
    created_at?: Date | string
    keyword: string
    uuid?: string
    explanation?: string | null
    example?: string | null
    question_log_question: question_log_questionCreateNestedOneWithoutQuestion_keywordInput
  }

  export type question_keywordUncheckedCreateInput = {
    id?: number
    created_at?: Date | string
    keyword: string
    question_id: number
    uuid?: string
    explanation?: string | null
    example?: string | null
  }

  export type question_keywordUpdateInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
    question_log_question?: question_log_questionUpdateOneRequiredWithoutQuestion_keywordNestedInput
  }

  export type question_keywordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    question_id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_keywordCreateManyInput = {
    id?: number
    created_at?: Date | string
    keyword: string
    question_id: number
    uuid?: string
    explanation?: string | null
    example?: string | null
  }

  export type question_keywordUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_keywordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    question_id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type TopicListRelationFilter = {
    every?: topicWhereInput
    some?: topicWhereInput
    none?: topicWhereInput
  }

  export type Question_logListRelationFilter = {
    every?: question_logWhereInput
    some?: question_logWhereInput
    none?: question_logWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type topicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type question_logOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type departmentCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type departmentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type departmentMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type departmentMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type departmentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type participantCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    google_id?: SortOrder
    uuid?: SortOrder
  }

  export type participantAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type participantMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    google_id?: SortOrder
    uuid?: SortOrder
  }

  export type participantMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    google_id?: SortOrder
    uuid?: SortOrder
  }

  export type participantSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DepartmentNullableScalarRelationFilter = {
    is?: departmentWhereInput | null
    isNot?: departmentWhereInput | null
  }

  export type Question_log_topicListRelationFilter = {
    every?: question_log_topicWhereInput
    some?: question_log_topicWhereInput
    none?: question_log_topicWhereInput
  }

  export type question_log_topicOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type topicCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    department?: SortOrder
    uuid?: SortOrder
  }

  export type topicAvgOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
  }

  export type topicMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    department?: SortOrder
    uuid?: SortOrder
  }

  export type topicMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    department?: SortOrder
    uuid?: SortOrder
  }

  export type topicSumOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type userAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    email?: SortOrder
    name?: SortOrder
    uuid?: SortOrder
  }

  export type userSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ParticipantScalarRelationFilter = {
    is?: participantWhereInput
    isNot?: participantWhereInput
  }

  export type DepartmentScalarRelationFilter = {
    is?: departmentWhereInput
    isNot?: departmentWhereInput
  }

  export type Question_log_questionListRelationFilter = {
    every?: question_log_questionWhereInput
    some?: question_log_questionWhereInput
    none?: question_log_questionWhereInput
  }

  export type question_log_questionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type question_logCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    difficulty?: SortOrder
    completed?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    end_time?: SortOrder
    timezone_offset?: SortOrder
    timezone_name?: SortOrder
  }

  export type question_logAvgOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    timezone_offset?: SortOrder
  }

  export type question_logMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    difficulty?: SortOrder
    completed?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    end_time?: SortOrder
    timezone_offset?: SortOrder
    timezone_name?: SortOrder
  }

  export type question_logMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    difficulty?: SortOrder
    completed?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    end_time?: SortOrder
    timezone_offset?: SortOrder
    timezone_name?: SortOrder
  }

  export type question_logSumOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    participant?: SortOrder
    timer?: SortOrder
    question_count?: SortOrder
    total_answers?: SortOrder
    total_correct?: SortOrder
    score?: SortOrder
    timezone_offset?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type Question_logScalarRelationFilter = {
    is?: question_logWhereInput
    isNot?: question_logWhereInput
  }

  export type TopicScalarRelationFilter = {
    is?: topicWhereInput
    isNot?: topicWhereInput
  }

  export type question_log_topicQuestion_log_idTopic_idCompoundUniqueInput = {
    question_log_id: number
    topic_id: number
  }

  export type question_log_topicCountOrderByAggregateInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
  }

  export type question_log_topicAvgOrderByAggregateInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
  }

  export type question_log_topicMaxOrderByAggregateInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
  }

  export type question_log_topicMinOrderByAggregateInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
  }

  export type question_log_topicSumOrderByAggregateInput = {
    question_log_id?: SortOrder
    topic_id?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type Question_keywordListRelationFilter = {
    every?: question_keywordWhereInput
    some?: question_keywordWhereInput
    none?: question_keywordWhereInput
  }

  export type question_keywordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type question_log_questionCountOrderByAggregateInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    answer?: SortOrder
    explanation?: SortOrder
    topic?: SortOrder
    selected_answer?: SortOrder
    question_type?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
  }

  export type question_log_questionAvgOrderByAggregateInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    answer?: SortOrder
    selected_answer?: SortOrder
  }

  export type question_log_questionMaxOrderByAggregateInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    question?: SortOrder
    explanation?: SortOrder
    topic?: SortOrder
    question_type?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
  }

  export type question_log_questionMinOrderByAggregateInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    question?: SortOrder
    explanation?: SortOrder
    topic?: SortOrder
    question_type?: SortOrder
    created_at?: SortOrder
    uuid?: SortOrder
  }

  export type question_log_questionSumOrderByAggregateInput = {
    id?: SortOrder
    question_log_id?: SortOrder
    answer?: SortOrder
    selected_answer?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type Question_log_questionScalarRelationFilter = {
    is?: question_log_questionWhereInput
    isNot?: question_log_questionWhereInput
  }

  export type question_keywordCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    keyword?: SortOrder
    question_id?: SortOrder
    uuid?: SortOrder
    explanation?: SortOrder
    example?: SortOrder
  }

  export type question_keywordAvgOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
  }

  export type question_keywordMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    keyword?: SortOrder
    question_id?: SortOrder
    uuid?: SortOrder
    explanation?: SortOrder
    example?: SortOrder
  }

  export type question_keywordMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    keyword?: SortOrder
    question_id?: SortOrder
    uuid?: SortOrder
    explanation?: SortOrder
    example?: SortOrder
  }

  export type question_keywordSumOrderByAggregateInput = {
    id?: SortOrder
    question_id?: SortOrder
  }

  export type topicCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput = {
    create?: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput> | topicCreateWithoutDepartment_topic_departmentTodepartmentInput[] | topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput[]
    connectOrCreate?: topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput | topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput[]
    createMany?: topicCreateManyDepartment_topic_departmentTodepartmentInputEnvelope
    connect?: topicWhereUniqueInput | topicWhereUniqueInput[]
  }

  export type question_logCreateNestedManyWithoutQuestion_departmentInput = {
    create?: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput> | question_logCreateWithoutQuestion_departmentInput[] | question_logUncheckedCreateWithoutQuestion_departmentInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_departmentInput | question_logCreateOrConnectWithoutQuestion_departmentInput[]
    createMany?: question_logCreateManyQuestion_departmentInputEnvelope
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
  }

  export type topicUncheckedCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput = {
    create?: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput> | topicCreateWithoutDepartment_topic_departmentTodepartmentInput[] | topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput[]
    connectOrCreate?: topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput | topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput[]
    createMany?: topicCreateManyDepartment_topic_departmentTodepartmentInputEnvelope
    connect?: topicWhereUniqueInput | topicWhereUniqueInput[]
  }

  export type question_logUncheckedCreateNestedManyWithoutQuestion_departmentInput = {
    create?: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput> | question_logCreateWithoutQuestion_departmentInput[] | question_logUncheckedCreateWithoutQuestion_departmentInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_departmentInput | question_logCreateOrConnectWithoutQuestion_departmentInput[]
    createMany?: question_logCreateManyQuestion_departmentInputEnvelope
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type topicUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput = {
    create?: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput> | topicCreateWithoutDepartment_topic_departmentTodepartmentInput[] | topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput[]
    connectOrCreate?: topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput | topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput[]
    upsert?: topicUpsertWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput | topicUpsertWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput[]
    createMany?: topicCreateManyDepartment_topic_departmentTodepartmentInputEnvelope
    set?: topicWhereUniqueInput | topicWhereUniqueInput[]
    disconnect?: topicWhereUniqueInput | topicWhereUniqueInput[]
    delete?: topicWhereUniqueInput | topicWhereUniqueInput[]
    connect?: topicWhereUniqueInput | topicWhereUniqueInput[]
    update?: topicUpdateWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput | topicUpdateWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput[]
    updateMany?: topicUpdateManyWithWhereWithoutDepartment_topic_departmentTodepartmentInput | topicUpdateManyWithWhereWithoutDepartment_topic_departmentTodepartmentInput[]
    deleteMany?: topicScalarWhereInput | topicScalarWhereInput[]
  }

  export type question_logUpdateManyWithoutQuestion_departmentNestedInput = {
    create?: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput> | question_logCreateWithoutQuestion_departmentInput[] | question_logUncheckedCreateWithoutQuestion_departmentInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_departmentInput | question_logCreateOrConnectWithoutQuestion_departmentInput[]
    upsert?: question_logUpsertWithWhereUniqueWithoutQuestion_departmentInput | question_logUpsertWithWhereUniqueWithoutQuestion_departmentInput[]
    createMany?: question_logCreateManyQuestion_departmentInputEnvelope
    set?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    disconnect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    delete?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    update?: question_logUpdateWithWhereUniqueWithoutQuestion_departmentInput | question_logUpdateWithWhereUniqueWithoutQuestion_departmentInput[]
    updateMany?: question_logUpdateManyWithWhereWithoutQuestion_departmentInput | question_logUpdateManyWithWhereWithoutQuestion_departmentInput[]
    deleteMany?: question_logScalarWhereInput | question_logScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type topicUncheckedUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput = {
    create?: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput> | topicCreateWithoutDepartment_topic_departmentTodepartmentInput[] | topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput[]
    connectOrCreate?: topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput | topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput[]
    upsert?: topicUpsertWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput | topicUpsertWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput[]
    createMany?: topicCreateManyDepartment_topic_departmentTodepartmentInputEnvelope
    set?: topicWhereUniqueInput | topicWhereUniqueInput[]
    disconnect?: topicWhereUniqueInput | topicWhereUniqueInput[]
    delete?: topicWhereUniqueInput | topicWhereUniqueInput[]
    connect?: topicWhereUniqueInput | topicWhereUniqueInput[]
    update?: topicUpdateWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput | topicUpdateWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput[]
    updateMany?: topicUpdateManyWithWhereWithoutDepartment_topic_departmentTodepartmentInput | topicUpdateManyWithWhereWithoutDepartment_topic_departmentTodepartmentInput[]
    deleteMany?: topicScalarWhereInput | topicScalarWhereInput[]
  }

  export type question_logUncheckedUpdateManyWithoutQuestion_departmentNestedInput = {
    create?: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput> | question_logCreateWithoutQuestion_departmentInput[] | question_logUncheckedCreateWithoutQuestion_departmentInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_departmentInput | question_logCreateOrConnectWithoutQuestion_departmentInput[]
    upsert?: question_logUpsertWithWhereUniqueWithoutQuestion_departmentInput | question_logUpsertWithWhereUniqueWithoutQuestion_departmentInput[]
    createMany?: question_logCreateManyQuestion_departmentInputEnvelope
    set?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    disconnect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    delete?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    update?: question_logUpdateWithWhereUniqueWithoutQuestion_departmentInput | question_logUpdateWithWhereUniqueWithoutQuestion_departmentInput[]
    updateMany?: question_logUpdateManyWithWhereWithoutQuestion_departmentInput | question_logUpdateManyWithWhereWithoutQuestion_departmentInput[]
    deleteMany?: question_logScalarWhereInput | question_logScalarWhereInput[]
  }

  export type question_logCreateNestedManyWithoutQuestion_generatorInput = {
    create?: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput> | question_logCreateWithoutQuestion_generatorInput[] | question_logUncheckedCreateWithoutQuestion_generatorInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_generatorInput | question_logCreateOrConnectWithoutQuestion_generatorInput[]
    createMany?: question_logCreateManyQuestion_generatorInputEnvelope
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
  }

  export type question_logUncheckedCreateNestedManyWithoutQuestion_generatorInput = {
    create?: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput> | question_logCreateWithoutQuestion_generatorInput[] | question_logUncheckedCreateWithoutQuestion_generatorInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_generatorInput | question_logCreateOrConnectWithoutQuestion_generatorInput[]
    createMany?: question_logCreateManyQuestion_generatorInputEnvelope
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type question_logUpdateManyWithoutQuestion_generatorNestedInput = {
    create?: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput> | question_logCreateWithoutQuestion_generatorInput[] | question_logUncheckedCreateWithoutQuestion_generatorInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_generatorInput | question_logCreateOrConnectWithoutQuestion_generatorInput[]
    upsert?: question_logUpsertWithWhereUniqueWithoutQuestion_generatorInput | question_logUpsertWithWhereUniqueWithoutQuestion_generatorInput[]
    createMany?: question_logCreateManyQuestion_generatorInputEnvelope
    set?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    disconnect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    delete?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    update?: question_logUpdateWithWhereUniqueWithoutQuestion_generatorInput | question_logUpdateWithWhereUniqueWithoutQuestion_generatorInput[]
    updateMany?: question_logUpdateManyWithWhereWithoutQuestion_generatorInput | question_logUpdateManyWithWhereWithoutQuestion_generatorInput[]
    deleteMany?: question_logScalarWhereInput | question_logScalarWhereInput[]
  }

  export type question_logUncheckedUpdateManyWithoutQuestion_generatorNestedInput = {
    create?: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput> | question_logCreateWithoutQuestion_generatorInput[] | question_logUncheckedCreateWithoutQuestion_generatorInput[]
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_generatorInput | question_logCreateOrConnectWithoutQuestion_generatorInput[]
    upsert?: question_logUpsertWithWhereUniqueWithoutQuestion_generatorInput | question_logUpsertWithWhereUniqueWithoutQuestion_generatorInput[]
    createMany?: question_logCreateManyQuestion_generatorInputEnvelope
    set?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    disconnect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    delete?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    connect?: question_logWhereUniqueInput | question_logWhereUniqueInput[]
    update?: question_logUpdateWithWhereUniqueWithoutQuestion_generatorInput | question_logUpdateWithWhereUniqueWithoutQuestion_generatorInput[]
    updateMany?: question_logUpdateManyWithWhereWithoutQuestion_generatorInput | question_logUpdateManyWithWhereWithoutQuestion_generatorInput[]
    deleteMany?: question_logScalarWhereInput | question_logScalarWhereInput[]
  }

  export type departmentCreateNestedOneWithoutTopic_topic_departmentTodepartmentInput = {
    create?: XOR<departmentCreateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedCreateWithoutTopic_topic_departmentTodepartmentInput>
    connectOrCreate?: departmentCreateOrConnectWithoutTopic_topic_departmentTodepartmentInput
    connect?: departmentWhereUniqueInput
  }

  export type question_log_topicCreateNestedManyWithoutTopicInput = {
    create?: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput> | question_log_topicCreateWithoutTopicInput[] | question_log_topicUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutTopicInput | question_log_topicCreateOrConnectWithoutTopicInput[]
    createMany?: question_log_topicCreateManyTopicInputEnvelope
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
  }

  export type question_log_topicUncheckedCreateNestedManyWithoutTopicInput = {
    create?: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput> | question_log_topicCreateWithoutTopicInput[] | question_log_topicUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutTopicInput | question_log_topicCreateOrConnectWithoutTopicInput[]
    createMany?: question_log_topicCreateManyTopicInputEnvelope
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
  }

  export type departmentUpdateOneWithoutTopic_topic_departmentTodepartmentNestedInput = {
    create?: XOR<departmentCreateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedCreateWithoutTopic_topic_departmentTodepartmentInput>
    connectOrCreate?: departmentCreateOrConnectWithoutTopic_topic_departmentTodepartmentInput
    upsert?: departmentUpsertWithoutTopic_topic_departmentTodepartmentInput
    disconnect?: departmentWhereInput | boolean
    delete?: departmentWhereInput | boolean
    connect?: departmentWhereUniqueInput
    update?: XOR<XOR<departmentUpdateToOneWithWhereWithoutTopic_topic_departmentTodepartmentInput, departmentUpdateWithoutTopic_topic_departmentTodepartmentInput>, departmentUncheckedUpdateWithoutTopic_topic_departmentTodepartmentInput>
  }

  export type question_log_topicUpdateManyWithoutTopicNestedInput = {
    create?: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput> | question_log_topicCreateWithoutTopicInput[] | question_log_topicUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutTopicInput | question_log_topicCreateOrConnectWithoutTopicInput[]
    upsert?: question_log_topicUpsertWithWhereUniqueWithoutTopicInput | question_log_topicUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: question_log_topicCreateManyTopicInputEnvelope
    set?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    disconnect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    delete?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    update?: question_log_topicUpdateWithWhereUniqueWithoutTopicInput | question_log_topicUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: question_log_topicUpdateManyWithWhereWithoutTopicInput | question_log_topicUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type question_log_topicUncheckedUpdateManyWithoutTopicNestedInput = {
    create?: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput> | question_log_topicCreateWithoutTopicInput[] | question_log_topicUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutTopicInput | question_log_topicCreateOrConnectWithoutTopicInput[]
    upsert?: question_log_topicUpsertWithWhereUniqueWithoutTopicInput | question_log_topicUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: question_log_topicCreateManyTopicInputEnvelope
    set?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    disconnect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    delete?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    update?: question_log_topicUpdateWithWhereUniqueWithoutTopicInput | question_log_topicUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: question_log_topicUpdateManyWithWhereWithoutTopicInput | question_log_topicUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
  }

  export type participantCreateNestedOneWithoutQuestion_logInput = {
    create?: XOR<participantCreateWithoutQuestion_logInput, participantUncheckedCreateWithoutQuestion_logInput>
    connectOrCreate?: participantCreateOrConnectWithoutQuestion_logInput
    connect?: participantWhereUniqueInput
  }

  export type departmentCreateNestedOneWithoutQuestion_log_question_departmentInput = {
    create?: XOR<departmentCreateWithoutQuestion_log_question_departmentInput, departmentUncheckedCreateWithoutQuestion_log_question_departmentInput>
    connectOrCreate?: departmentCreateOrConnectWithoutQuestion_log_question_departmentInput
    connect?: departmentWhereUniqueInput
  }

  export type question_log_topicCreateNestedManyWithoutQuestion_logInput = {
    create?: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput> | question_log_topicCreateWithoutQuestion_logInput[] | question_log_topicUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutQuestion_logInput | question_log_topicCreateOrConnectWithoutQuestion_logInput[]
    createMany?: question_log_topicCreateManyQuestion_logInputEnvelope
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
  }

  export type question_log_questionCreateNestedManyWithoutQuestion_logInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput> | question_log_questionCreateWithoutQuestion_logInput[] | question_log_questionUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_logInput | question_log_questionCreateOrConnectWithoutQuestion_logInput[]
    createMany?: question_log_questionCreateManyQuestion_logInputEnvelope
    connect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
  }

  export type question_log_topicUncheckedCreateNestedManyWithoutQuestion_logInput = {
    create?: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput> | question_log_topicCreateWithoutQuestion_logInput[] | question_log_topicUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutQuestion_logInput | question_log_topicCreateOrConnectWithoutQuestion_logInput[]
    createMany?: question_log_topicCreateManyQuestion_logInputEnvelope
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
  }

  export type question_log_questionUncheckedCreateNestedManyWithoutQuestion_logInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput> | question_log_questionCreateWithoutQuestion_logInput[] | question_log_questionUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_logInput | question_log_questionCreateOrConnectWithoutQuestion_logInput[]
    createMany?: question_log_questionCreateManyQuestion_logInputEnvelope
    connect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type participantUpdateOneRequiredWithoutQuestion_logNestedInput = {
    create?: XOR<participantCreateWithoutQuestion_logInput, participantUncheckedCreateWithoutQuestion_logInput>
    connectOrCreate?: participantCreateOrConnectWithoutQuestion_logInput
    upsert?: participantUpsertWithoutQuestion_logInput
    connect?: participantWhereUniqueInput
    update?: XOR<XOR<participantUpdateToOneWithWhereWithoutQuestion_logInput, participantUpdateWithoutQuestion_logInput>, participantUncheckedUpdateWithoutQuestion_logInput>
  }

  export type departmentUpdateOneRequiredWithoutQuestion_log_question_departmentNestedInput = {
    create?: XOR<departmentCreateWithoutQuestion_log_question_departmentInput, departmentUncheckedCreateWithoutQuestion_log_question_departmentInput>
    connectOrCreate?: departmentCreateOrConnectWithoutQuestion_log_question_departmentInput
    upsert?: departmentUpsertWithoutQuestion_log_question_departmentInput
    connect?: departmentWhereUniqueInput
    update?: XOR<XOR<departmentUpdateToOneWithWhereWithoutQuestion_log_question_departmentInput, departmentUpdateWithoutQuestion_log_question_departmentInput>, departmentUncheckedUpdateWithoutQuestion_log_question_departmentInput>
  }

  export type question_log_topicUpdateManyWithoutQuestion_logNestedInput = {
    create?: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput> | question_log_topicCreateWithoutQuestion_logInput[] | question_log_topicUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutQuestion_logInput | question_log_topicCreateOrConnectWithoutQuestion_logInput[]
    upsert?: question_log_topicUpsertWithWhereUniqueWithoutQuestion_logInput | question_log_topicUpsertWithWhereUniqueWithoutQuestion_logInput[]
    createMany?: question_log_topicCreateManyQuestion_logInputEnvelope
    set?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    disconnect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    delete?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    update?: question_log_topicUpdateWithWhereUniqueWithoutQuestion_logInput | question_log_topicUpdateWithWhereUniqueWithoutQuestion_logInput[]
    updateMany?: question_log_topicUpdateManyWithWhereWithoutQuestion_logInput | question_log_topicUpdateManyWithWhereWithoutQuestion_logInput[]
    deleteMany?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
  }

  export type question_log_questionUpdateManyWithoutQuestion_logNestedInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput> | question_log_questionCreateWithoutQuestion_logInput[] | question_log_questionUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_logInput | question_log_questionCreateOrConnectWithoutQuestion_logInput[]
    upsert?: question_log_questionUpsertWithWhereUniqueWithoutQuestion_logInput | question_log_questionUpsertWithWhereUniqueWithoutQuestion_logInput[]
    createMany?: question_log_questionCreateManyQuestion_logInputEnvelope
    set?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    disconnect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    delete?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    connect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    update?: question_log_questionUpdateWithWhereUniqueWithoutQuestion_logInput | question_log_questionUpdateWithWhereUniqueWithoutQuestion_logInput[]
    updateMany?: question_log_questionUpdateManyWithWhereWithoutQuestion_logInput | question_log_questionUpdateManyWithWhereWithoutQuestion_logInput[]
    deleteMany?: question_log_questionScalarWhereInput | question_log_questionScalarWhereInput[]
  }

  export type question_log_topicUncheckedUpdateManyWithoutQuestion_logNestedInput = {
    create?: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput> | question_log_topicCreateWithoutQuestion_logInput[] | question_log_topicUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_topicCreateOrConnectWithoutQuestion_logInput | question_log_topicCreateOrConnectWithoutQuestion_logInput[]
    upsert?: question_log_topicUpsertWithWhereUniqueWithoutQuestion_logInput | question_log_topicUpsertWithWhereUniqueWithoutQuestion_logInput[]
    createMany?: question_log_topicCreateManyQuestion_logInputEnvelope
    set?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    disconnect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    delete?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    connect?: question_log_topicWhereUniqueInput | question_log_topicWhereUniqueInput[]
    update?: question_log_topicUpdateWithWhereUniqueWithoutQuestion_logInput | question_log_topicUpdateWithWhereUniqueWithoutQuestion_logInput[]
    updateMany?: question_log_topicUpdateManyWithWhereWithoutQuestion_logInput | question_log_topicUpdateManyWithWhereWithoutQuestion_logInput[]
    deleteMany?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
  }

  export type question_log_questionUncheckedUpdateManyWithoutQuestion_logNestedInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput> | question_log_questionCreateWithoutQuestion_logInput[] | question_log_questionUncheckedCreateWithoutQuestion_logInput[]
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_logInput | question_log_questionCreateOrConnectWithoutQuestion_logInput[]
    upsert?: question_log_questionUpsertWithWhereUniqueWithoutQuestion_logInput | question_log_questionUpsertWithWhereUniqueWithoutQuestion_logInput[]
    createMany?: question_log_questionCreateManyQuestion_logInputEnvelope
    set?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    disconnect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    delete?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    connect?: question_log_questionWhereUniqueInput | question_log_questionWhereUniqueInput[]
    update?: question_log_questionUpdateWithWhereUniqueWithoutQuestion_logInput | question_log_questionUpdateWithWhereUniqueWithoutQuestion_logInput[]
    updateMany?: question_log_questionUpdateManyWithWhereWithoutQuestion_logInput | question_log_questionUpdateManyWithWhereWithoutQuestion_logInput[]
    deleteMany?: question_log_questionScalarWhereInput | question_log_questionScalarWhereInput[]
  }

  export type question_logCreateNestedOneWithoutTopicsInput = {
    create?: XOR<question_logCreateWithoutTopicsInput, question_logUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: question_logCreateOrConnectWithoutTopicsInput
    connect?: question_logWhereUniqueInput
  }

  export type topicCreateNestedOneWithoutQuestion_logsInput = {
    create?: XOR<topicCreateWithoutQuestion_logsInput, topicUncheckedCreateWithoutQuestion_logsInput>
    connectOrCreate?: topicCreateOrConnectWithoutQuestion_logsInput
    connect?: topicWhereUniqueInput
  }

  export type question_logUpdateOneRequiredWithoutTopicsNestedInput = {
    create?: XOR<question_logCreateWithoutTopicsInput, question_logUncheckedCreateWithoutTopicsInput>
    connectOrCreate?: question_logCreateOrConnectWithoutTopicsInput
    upsert?: question_logUpsertWithoutTopicsInput
    connect?: question_logWhereUniqueInput
    update?: XOR<XOR<question_logUpdateToOneWithWhereWithoutTopicsInput, question_logUpdateWithoutTopicsInput>, question_logUncheckedUpdateWithoutTopicsInput>
  }

  export type topicUpdateOneRequiredWithoutQuestion_logsNestedInput = {
    create?: XOR<topicCreateWithoutQuestion_logsInput, topicUncheckedCreateWithoutQuestion_logsInput>
    connectOrCreate?: topicCreateOrConnectWithoutQuestion_logsInput
    upsert?: topicUpsertWithoutQuestion_logsInput
    connect?: topicWhereUniqueInput
    update?: XOR<XOR<topicUpdateToOneWithWhereWithoutQuestion_logsInput, topicUpdateWithoutQuestion_logsInput>, topicUncheckedUpdateWithoutQuestion_logsInput>
  }

  export type question_log_questionCreateoptionsInput = {
    set: string[]
  }

  export type question_log_questionCreateanswerInput = {
    set: number[]
  }

  export type question_log_questionCreateselected_answerInput = {
    set: number[]
  }

  export type question_logCreateNestedOneWithoutQuestion_log_questionInput = {
    create?: XOR<question_logCreateWithoutQuestion_log_questionInput, question_logUncheckedCreateWithoutQuestion_log_questionInput>
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_log_questionInput
    connect?: question_logWhereUniqueInput
  }

  export type question_keywordCreateNestedManyWithoutQuestion_log_questionInput = {
    create?: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput> | question_keywordCreateWithoutQuestion_log_questionInput[] | question_keywordUncheckedCreateWithoutQuestion_log_questionInput[]
    connectOrCreate?: question_keywordCreateOrConnectWithoutQuestion_log_questionInput | question_keywordCreateOrConnectWithoutQuestion_log_questionInput[]
    createMany?: question_keywordCreateManyQuestion_log_questionInputEnvelope
    connect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
  }

  export type question_keywordUncheckedCreateNestedManyWithoutQuestion_log_questionInput = {
    create?: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput> | question_keywordCreateWithoutQuestion_log_questionInput[] | question_keywordUncheckedCreateWithoutQuestion_log_questionInput[]
    connectOrCreate?: question_keywordCreateOrConnectWithoutQuestion_log_questionInput | question_keywordCreateOrConnectWithoutQuestion_log_questionInput[]
    createMany?: question_keywordCreateManyQuestion_log_questionInputEnvelope
    connect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
  }

  export type question_log_questionUpdateoptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type question_log_questionUpdateanswerInput = {
    set?: number[]
    push?: number | number[]
  }

  export type question_log_questionUpdateselected_answerInput = {
    set?: number[]
    push?: number | number[]
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type question_logUpdateOneRequiredWithoutQuestion_log_questionNestedInput = {
    create?: XOR<question_logCreateWithoutQuestion_log_questionInput, question_logUncheckedCreateWithoutQuestion_log_questionInput>
    connectOrCreate?: question_logCreateOrConnectWithoutQuestion_log_questionInput
    upsert?: question_logUpsertWithoutQuestion_log_questionInput
    connect?: question_logWhereUniqueInput
    update?: XOR<XOR<question_logUpdateToOneWithWhereWithoutQuestion_log_questionInput, question_logUpdateWithoutQuestion_log_questionInput>, question_logUncheckedUpdateWithoutQuestion_log_questionInput>
  }

  export type question_keywordUpdateManyWithoutQuestion_log_questionNestedInput = {
    create?: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput> | question_keywordCreateWithoutQuestion_log_questionInput[] | question_keywordUncheckedCreateWithoutQuestion_log_questionInput[]
    connectOrCreate?: question_keywordCreateOrConnectWithoutQuestion_log_questionInput | question_keywordCreateOrConnectWithoutQuestion_log_questionInput[]
    upsert?: question_keywordUpsertWithWhereUniqueWithoutQuestion_log_questionInput | question_keywordUpsertWithWhereUniqueWithoutQuestion_log_questionInput[]
    createMany?: question_keywordCreateManyQuestion_log_questionInputEnvelope
    set?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    disconnect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    delete?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    connect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    update?: question_keywordUpdateWithWhereUniqueWithoutQuestion_log_questionInput | question_keywordUpdateWithWhereUniqueWithoutQuestion_log_questionInput[]
    updateMany?: question_keywordUpdateManyWithWhereWithoutQuestion_log_questionInput | question_keywordUpdateManyWithWhereWithoutQuestion_log_questionInput[]
    deleteMany?: question_keywordScalarWhereInput | question_keywordScalarWhereInput[]
  }

  export type question_keywordUncheckedUpdateManyWithoutQuestion_log_questionNestedInput = {
    create?: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput> | question_keywordCreateWithoutQuestion_log_questionInput[] | question_keywordUncheckedCreateWithoutQuestion_log_questionInput[]
    connectOrCreate?: question_keywordCreateOrConnectWithoutQuestion_log_questionInput | question_keywordCreateOrConnectWithoutQuestion_log_questionInput[]
    upsert?: question_keywordUpsertWithWhereUniqueWithoutQuestion_log_questionInput | question_keywordUpsertWithWhereUniqueWithoutQuestion_log_questionInput[]
    createMany?: question_keywordCreateManyQuestion_log_questionInputEnvelope
    set?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    disconnect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    delete?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    connect?: question_keywordWhereUniqueInput | question_keywordWhereUniqueInput[]
    update?: question_keywordUpdateWithWhereUniqueWithoutQuestion_log_questionInput | question_keywordUpdateWithWhereUniqueWithoutQuestion_log_questionInput[]
    updateMany?: question_keywordUpdateManyWithWhereWithoutQuestion_log_questionInput | question_keywordUpdateManyWithWhereWithoutQuestion_log_questionInput[]
    deleteMany?: question_keywordScalarWhereInput | question_keywordScalarWhereInput[]
  }

  export type question_log_questionCreateNestedOneWithoutQuestion_keywordInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_keywordInput, question_log_questionUncheckedCreateWithoutQuestion_keywordInput>
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_keywordInput
    connect?: question_log_questionWhereUniqueInput
  }

  export type question_log_questionUpdateOneRequiredWithoutQuestion_keywordNestedInput = {
    create?: XOR<question_log_questionCreateWithoutQuestion_keywordInput, question_log_questionUncheckedCreateWithoutQuestion_keywordInput>
    connectOrCreate?: question_log_questionCreateOrConnectWithoutQuestion_keywordInput
    upsert?: question_log_questionUpsertWithoutQuestion_keywordInput
    connect?: question_log_questionWhereUniqueInput
    update?: XOR<XOR<question_log_questionUpdateToOneWithWhereWithoutQuestion_keywordInput, question_log_questionUpdateWithoutQuestion_keywordInput>, question_log_questionUncheckedUpdateWithoutQuestion_keywordInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.QuestionType[] | ListEnumQuestionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type topicCreateWithoutDepartment_topic_departmentTodepartmentInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string
    question_logs?: question_log_topicCreateNestedManyWithoutTopicInput
  }

  export type topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string
    question_logs?: question_log_topicUncheckedCreateNestedManyWithoutTopicInput
  }

  export type topicCreateOrConnectWithoutDepartment_topic_departmentTodepartmentInput = {
    where: topicWhereUniqueInput
    create: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput>
  }

  export type topicCreateManyDepartment_topic_departmentTodepartmentInputEnvelope = {
    data: topicCreateManyDepartment_topic_departmentTodepartmentInput | topicCreateManyDepartment_topic_departmentTodepartmentInput[]
    skipDuplicates?: boolean
  }

  export type question_logCreateWithoutQuestion_departmentInput = {
    created_at?: Date | string
    uuid?: string
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_generator: participantCreateNestedOneWithoutQuestion_logInput
    topics?: question_log_topicCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUncheckedCreateWithoutQuestion_departmentInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    topics?: question_log_topicUncheckedCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionUncheckedCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logCreateOrConnectWithoutQuestion_departmentInput = {
    where: question_logWhereUniqueInput
    create: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput>
  }

  export type question_logCreateManyQuestion_departmentInputEnvelope = {
    data: question_logCreateManyQuestion_departmentInput | question_logCreateManyQuestion_departmentInput[]
    skipDuplicates?: boolean
  }

  export type topicUpsertWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput = {
    where: topicWhereUniqueInput
    update: XOR<topicUpdateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedUpdateWithoutDepartment_topic_departmentTodepartmentInput>
    create: XOR<topicCreateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedCreateWithoutDepartment_topic_departmentTodepartmentInput>
  }

  export type topicUpdateWithWhereUniqueWithoutDepartment_topic_departmentTodepartmentInput = {
    where: topicWhereUniqueInput
    data: XOR<topicUpdateWithoutDepartment_topic_departmentTodepartmentInput, topicUncheckedUpdateWithoutDepartment_topic_departmentTodepartmentInput>
  }

  export type topicUpdateManyWithWhereWithoutDepartment_topic_departmentTodepartmentInput = {
    where: topicScalarWhereInput
    data: XOR<topicUpdateManyMutationInput, topicUncheckedUpdateManyWithoutDepartment_topic_departmentTodepartmentInput>
  }

  export type topicScalarWhereInput = {
    AND?: topicScalarWhereInput | topicScalarWhereInput[]
    OR?: topicScalarWhereInput[]
    NOT?: topicScalarWhereInput | topicScalarWhereInput[]
    id?: IntFilter<"topic"> | number
    created_at?: DateTimeFilter<"topic"> | Date | string
    name?: StringNullableFilter<"topic"> | string | null
    department?: IntNullableFilter<"topic"> | number | null
    uuid?: UuidFilter<"topic"> | string
  }

  export type question_logUpsertWithWhereUniqueWithoutQuestion_departmentInput = {
    where: question_logWhereUniqueInput
    update: XOR<question_logUpdateWithoutQuestion_departmentInput, question_logUncheckedUpdateWithoutQuestion_departmentInput>
    create: XOR<question_logCreateWithoutQuestion_departmentInput, question_logUncheckedCreateWithoutQuestion_departmentInput>
  }

  export type question_logUpdateWithWhereUniqueWithoutQuestion_departmentInput = {
    where: question_logWhereUniqueInput
    data: XOR<question_logUpdateWithoutQuestion_departmentInput, question_logUncheckedUpdateWithoutQuestion_departmentInput>
  }

  export type question_logUpdateManyWithWhereWithoutQuestion_departmentInput = {
    where: question_logScalarWhereInput
    data: XOR<question_logUpdateManyMutationInput, question_logUncheckedUpdateManyWithoutQuestion_departmentInput>
  }

  export type question_logScalarWhereInput = {
    AND?: question_logScalarWhereInput | question_logScalarWhereInput[]
    OR?: question_logScalarWhereInput[]
    NOT?: question_logScalarWhereInput | question_logScalarWhereInput[]
    id?: IntFilter<"question_log"> | number
    created_at?: DateTimeFilter<"question_log"> | Date | string
    uuid?: UuidFilter<"question_log"> | string
    department?: IntFilter<"question_log"> | number
    participant?: IntFilter<"question_log"> | number
    timer?: IntFilter<"question_log"> | number
    question_count?: IntFilter<"question_log"> | number
    difficulty?: StringFilter<"question_log"> | string
    completed?: BoolFilter<"question_log"> | boolean
    total_answers?: IntFilter<"question_log"> | number
    total_correct?: IntFilter<"question_log"> | number
    score?: IntFilter<"question_log"> | number
    end_time?: DateTimeNullableFilter<"question_log"> | Date | string | null
    timezone_offset?: IntNullableFilter<"question_log"> | number | null
    timezone_name?: StringNullableFilter<"question_log"> | string | null
  }

  export type question_logCreateWithoutQuestion_generatorInput = {
    created_at?: Date | string
    uuid?: string
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_department: departmentCreateNestedOneWithoutQuestion_log_question_departmentInput
    topics?: question_log_topicCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUncheckedCreateWithoutQuestion_generatorInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    topics?: question_log_topicUncheckedCreateNestedManyWithoutQuestion_logInput
    question_log_question?: question_log_questionUncheckedCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logCreateOrConnectWithoutQuestion_generatorInput = {
    where: question_logWhereUniqueInput
    create: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput>
  }

  export type question_logCreateManyQuestion_generatorInputEnvelope = {
    data: question_logCreateManyQuestion_generatorInput | question_logCreateManyQuestion_generatorInput[]
    skipDuplicates?: boolean
  }

  export type question_logUpsertWithWhereUniqueWithoutQuestion_generatorInput = {
    where: question_logWhereUniqueInput
    update: XOR<question_logUpdateWithoutQuestion_generatorInput, question_logUncheckedUpdateWithoutQuestion_generatorInput>
    create: XOR<question_logCreateWithoutQuestion_generatorInput, question_logUncheckedCreateWithoutQuestion_generatorInput>
  }

  export type question_logUpdateWithWhereUniqueWithoutQuestion_generatorInput = {
    where: question_logWhereUniqueInput
    data: XOR<question_logUpdateWithoutQuestion_generatorInput, question_logUncheckedUpdateWithoutQuestion_generatorInput>
  }

  export type question_logUpdateManyWithWhereWithoutQuestion_generatorInput = {
    where: question_logScalarWhereInput
    data: XOR<question_logUpdateManyMutationInput, question_logUncheckedUpdateManyWithoutQuestion_generatorInput>
  }

  export type departmentCreateWithoutTopic_topic_departmentTodepartmentInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    question_log_question_department?: question_logCreateNestedManyWithoutQuestion_departmentInput
  }

  export type departmentUncheckedCreateWithoutTopic_topic_departmentTodepartmentInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    question_log_question_department?: question_logUncheckedCreateNestedManyWithoutQuestion_departmentInput
  }

  export type departmentCreateOrConnectWithoutTopic_topic_departmentTodepartmentInput = {
    where: departmentWhereUniqueInput
    create: XOR<departmentCreateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedCreateWithoutTopic_topic_departmentTodepartmentInput>
  }

  export type question_log_topicCreateWithoutTopicInput = {
    question_log: question_logCreateNestedOneWithoutTopicsInput
  }

  export type question_log_topicUncheckedCreateWithoutTopicInput = {
    question_log_id: number
  }

  export type question_log_topicCreateOrConnectWithoutTopicInput = {
    where: question_log_topicWhereUniqueInput
    create: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput>
  }

  export type question_log_topicCreateManyTopicInputEnvelope = {
    data: question_log_topicCreateManyTopicInput | question_log_topicCreateManyTopicInput[]
    skipDuplicates?: boolean
  }

  export type departmentUpsertWithoutTopic_topic_departmentTodepartmentInput = {
    update: XOR<departmentUpdateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedUpdateWithoutTopic_topic_departmentTodepartmentInput>
    create: XOR<departmentCreateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedCreateWithoutTopic_topic_departmentTodepartmentInput>
    where?: departmentWhereInput
  }

  export type departmentUpdateToOneWithWhereWithoutTopic_topic_departmentTodepartmentInput = {
    where?: departmentWhereInput
    data: XOR<departmentUpdateWithoutTopic_topic_departmentTodepartmentInput, departmentUncheckedUpdateWithoutTopic_topic_departmentTodepartmentInput>
  }

  export type departmentUpdateWithoutTopic_topic_departmentTodepartmentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    question_log_question_department?: question_logUpdateManyWithoutQuestion_departmentNestedInput
  }

  export type departmentUncheckedUpdateWithoutTopic_topic_departmentTodepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    question_log_question_department?: question_logUncheckedUpdateManyWithoutQuestion_departmentNestedInput
  }

  export type question_log_topicUpsertWithWhereUniqueWithoutTopicInput = {
    where: question_log_topicWhereUniqueInput
    update: XOR<question_log_topicUpdateWithoutTopicInput, question_log_topicUncheckedUpdateWithoutTopicInput>
    create: XOR<question_log_topicCreateWithoutTopicInput, question_log_topicUncheckedCreateWithoutTopicInput>
  }

  export type question_log_topicUpdateWithWhereUniqueWithoutTopicInput = {
    where: question_log_topicWhereUniqueInput
    data: XOR<question_log_topicUpdateWithoutTopicInput, question_log_topicUncheckedUpdateWithoutTopicInput>
  }

  export type question_log_topicUpdateManyWithWhereWithoutTopicInput = {
    where: question_log_topicScalarWhereInput
    data: XOR<question_log_topicUpdateManyMutationInput, question_log_topicUncheckedUpdateManyWithoutTopicInput>
  }

  export type question_log_topicScalarWhereInput = {
    AND?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
    OR?: question_log_topicScalarWhereInput[]
    NOT?: question_log_topicScalarWhereInput | question_log_topicScalarWhereInput[]
    question_log_id?: IntFilter<"question_log_topic"> | number
    topic_id?: IntFilter<"question_log_topic"> | number
  }

  export type participantCreateWithoutQuestion_logInput = {
    created_at?: Date | string
    email: string
    name: string
    google_id?: string
    uuid?: string
  }

  export type participantUncheckedCreateWithoutQuestion_logInput = {
    id?: number
    created_at?: Date | string
    email: string
    name: string
    google_id?: string
    uuid?: string
  }

  export type participantCreateOrConnectWithoutQuestion_logInput = {
    where: participantWhereUniqueInput
    create: XOR<participantCreateWithoutQuestion_logInput, participantUncheckedCreateWithoutQuestion_logInput>
  }

  export type departmentCreateWithoutQuestion_log_question_departmentInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    topic_topic_departmentTodepartment?: topicCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput
  }

  export type departmentUncheckedCreateWithoutQuestion_log_question_departmentInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string | null
    topic_topic_departmentTodepartment?: topicUncheckedCreateNestedManyWithoutDepartment_topic_departmentTodepartmentInput
  }

  export type departmentCreateOrConnectWithoutQuestion_log_question_departmentInput = {
    where: departmentWhereUniqueInput
    create: XOR<departmentCreateWithoutQuestion_log_question_departmentInput, departmentUncheckedCreateWithoutQuestion_log_question_departmentInput>
  }

  export type question_log_topicCreateWithoutQuestion_logInput = {
    topic: topicCreateNestedOneWithoutQuestion_logsInput
  }

  export type question_log_topicUncheckedCreateWithoutQuestion_logInput = {
    topic_id: number
  }

  export type question_log_topicCreateOrConnectWithoutQuestion_logInput = {
    where: question_log_topicWhereUniqueInput
    create: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput>
  }

  export type question_log_topicCreateManyQuestion_logInputEnvelope = {
    data: question_log_topicCreateManyQuestion_logInput | question_log_topicCreateManyQuestion_logInput[]
    skipDuplicates?: boolean
  }

  export type question_log_questionCreateWithoutQuestion_logInput = {
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
    question_keyword?: question_keywordCreateNestedManyWithoutQuestion_log_questionInput
  }

  export type question_log_questionUncheckedCreateWithoutQuestion_logInput = {
    id?: number
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
    question_keyword?: question_keywordUncheckedCreateNestedManyWithoutQuestion_log_questionInput
  }

  export type question_log_questionCreateOrConnectWithoutQuestion_logInput = {
    where: question_log_questionWhereUniqueInput
    create: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput>
  }

  export type question_log_questionCreateManyQuestion_logInputEnvelope = {
    data: question_log_questionCreateManyQuestion_logInput | question_log_questionCreateManyQuestion_logInput[]
    skipDuplicates?: boolean
  }

  export type participantUpsertWithoutQuestion_logInput = {
    update: XOR<participantUpdateWithoutQuestion_logInput, participantUncheckedUpdateWithoutQuestion_logInput>
    create: XOR<participantCreateWithoutQuestion_logInput, participantUncheckedCreateWithoutQuestion_logInput>
    where?: participantWhereInput
  }

  export type participantUpdateToOneWithWhereWithoutQuestion_logInput = {
    where?: participantWhereInput
    data: XOR<participantUpdateWithoutQuestion_logInput, participantUncheckedUpdateWithoutQuestion_logInput>
  }

  export type participantUpdateWithoutQuestion_logInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type participantUncheckedUpdateWithoutQuestion_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    google_id?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type departmentUpsertWithoutQuestion_log_question_departmentInput = {
    update: XOR<departmentUpdateWithoutQuestion_log_question_departmentInput, departmentUncheckedUpdateWithoutQuestion_log_question_departmentInput>
    create: XOR<departmentCreateWithoutQuestion_log_question_departmentInput, departmentUncheckedCreateWithoutQuestion_log_question_departmentInput>
    where?: departmentWhereInput
  }

  export type departmentUpdateToOneWithWhereWithoutQuestion_log_question_departmentInput = {
    where?: departmentWhereInput
    data: XOR<departmentUpdateWithoutQuestion_log_question_departmentInput, departmentUncheckedUpdateWithoutQuestion_log_question_departmentInput>
  }

  export type departmentUpdateWithoutQuestion_log_question_departmentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    topic_topic_departmentTodepartment?: topicUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput
  }

  export type departmentUncheckedUpdateWithoutQuestion_log_question_departmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: NullableStringFieldUpdateOperationsInput | string | null
    topic_topic_departmentTodepartment?: topicUncheckedUpdateManyWithoutDepartment_topic_departmentTodepartmentNestedInput
  }

  export type question_log_topicUpsertWithWhereUniqueWithoutQuestion_logInput = {
    where: question_log_topicWhereUniqueInput
    update: XOR<question_log_topicUpdateWithoutQuestion_logInput, question_log_topicUncheckedUpdateWithoutQuestion_logInput>
    create: XOR<question_log_topicCreateWithoutQuestion_logInput, question_log_topicUncheckedCreateWithoutQuestion_logInput>
  }

  export type question_log_topicUpdateWithWhereUniqueWithoutQuestion_logInput = {
    where: question_log_topicWhereUniqueInput
    data: XOR<question_log_topicUpdateWithoutQuestion_logInput, question_log_topicUncheckedUpdateWithoutQuestion_logInput>
  }

  export type question_log_topicUpdateManyWithWhereWithoutQuestion_logInput = {
    where: question_log_topicScalarWhereInput
    data: XOR<question_log_topicUpdateManyMutationInput, question_log_topicUncheckedUpdateManyWithoutQuestion_logInput>
  }

  export type question_log_questionUpsertWithWhereUniqueWithoutQuestion_logInput = {
    where: question_log_questionWhereUniqueInput
    update: XOR<question_log_questionUpdateWithoutQuestion_logInput, question_log_questionUncheckedUpdateWithoutQuestion_logInput>
    create: XOR<question_log_questionCreateWithoutQuestion_logInput, question_log_questionUncheckedCreateWithoutQuestion_logInput>
  }

  export type question_log_questionUpdateWithWhereUniqueWithoutQuestion_logInput = {
    where: question_log_questionWhereUniqueInput
    data: XOR<question_log_questionUpdateWithoutQuestion_logInput, question_log_questionUncheckedUpdateWithoutQuestion_logInput>
  }

  export type question_log_questionUpdateManyWithWhereWithoutQuestion_logInput = {
    where: question_log_questionScalarWhereInput
    data: XOR<question_log_questionUpdateManyMutationInput, question_log_questionUncheckedUpdateManyWithoutQuestion_logInput>
  }

  export type question_log_questionScalarWhereInput = {
    AND?: question_log_questionScalarWhereInput | question_log_questionScalarWhereInput[]
    OR?: question_log_questionScalarWhereInput[]
    NOT?: question_log_questionScalarWhereInput | question_log_questionScalarWhereInput[]
    id?: IntFilter<"question_log_question"> | number
    question_log_id?: IntFilter<"question_log_question"> | number
    question?: StringFilter<"question_log_question"> | string
    options?: StringNullableListFilter<"question_log_question">
    answer?: IntNullableListFilter<"question_log_question">
    explanation?: StringNullableFilter<"question_log_question"> | string | null
    topic?: StringNullableFilter<"question_log_question"> | string | null
    selected_answer?: IntNullableListFilter<"question_log_question">
    question_type?: EnumQuestionTypeFilter<"question_log_question"> | $Enums.QuestionType
    created_at?: DateTimeFilter<"question_log_question"> | Date | string
    uuid?: UuidFilter<"question_log_question"> | string
  }

  export type question_logCreateWithoutTopicsInput = {
    created_at?: Date | string
    uuid?: string
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_generator: participantCreateNestedOneWithoutQuestion_logInput
    question_department: departmentCreateNestedOneWithoutQuestion_log_question_departmentInput
    question_log_question?: question_log_questionCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUncheckedCreateWithoutTopicsInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_log_question?: question_log_questionUncheckedCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logCreateOrConnectWithoutTopicsInput = {
    where: question_logWhereUniqueInput
    create: XOR<question_logCreateWithoutTopicsInput, question_logUncheckedCreateWithoutTopicsInput>
  }

  export type topicCreateWithoutQuestion_logsInput = {
    created_at?: Date | string
    name?: string | null
    uuid?: string
    department_topic_departmentTodepartment?: departmentCreateNestedOneWithoutTopic_topic_departmentTodepartmentInput
  }

  export type topicUncheckedCreateWithoutQuestion_logsInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    department?: number | null
    uuid?: string
  }

  export type topicCreateOrConnectWithoutQuestion_logsInput = {
    where: topicWhereUniqueInput
    create: XOR<topicCreateWithoutQuestion_logsInput, topicUncheckedCreateWithoutQuestion_logsInput>
  }

  export type question_logUpsertWithoutTopicsInput = {
    update: XOR<question_logUpdateWithoutTopicsInput, question_logUncheckedUpdateWithoutTopicsInput>
    create: XOR<question_logCreateWithoutTopicsInput, question_logUncheckedCreateWithoutTopicsInput>
    where?: question_logWhereInput
  }

  export type question_logUpdateToOneWithWhereWithoutTopicsInput = {
    where?: question_logWhereInput
    data: XOR<question_logUpdateWithoutTopicsInput, question_logUncheckedUpdateWithoutTopicsInput>
  }

  export type question_logUpdateWithoutTopicsInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_generator?: participantUpdateOneRequiredWithoutQuestion_logNestedInput
    question_department?: departmentUpdateOneRequiredWithoutQuestion_log_question_departmentNestedInput
    question_log_question?: question_log_questionUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateWithoutTopicsInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_log_question?: question_log_questionUncheckedUpdateManyWithoutQuestion_logNestedInput
  }

  export type topicUpsertWithoutQuestion_logsInput = {
    update: XOR<topicUpdateWithoutQuestion_logsInput, topicUncheckedUpdateWithoutQuestion_logsInput>
    create: XOR<topicCreateWithoutQuestion_logsInput, topicUncheckedCreateWithoutQuestion_logsInput>
    where?: topicWhereInput
  }

  export type topicUpdateToOneWithWhereWithoutQuestion_logsInput = {
    where?: topicWhereInput
    data: XOR<topicUpdateWithoutQuestion_logsInput, topicUncheckedUpdateWithoutQuestion_logsInput>
  }

  export type topicUpdateWithoutQuestion_logsInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
    department_topic_departmentTodepartment?: departmentUpdateOneWithoutTopic_topic_departmentTodepartmentNestedInput
  }

  export type topicUncheckedUpdateWithoutQuestion_logsInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    department?: NullableIntFieldUpdateOperationsInput | number | null
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_logCreateWithoutQuestion_log_questionInput = {
    created_at?: Date | string
    uuid?: string
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    question_generator: participantCreateNestedOneWithoutQuestion_logInput
    question_department: departmentCreateNestedOneWithoutQuestion_log_question_departmentInput
    topics?: question_log_topicCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logUncheckedCreateWithoutQuestion_log_questionInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
    topics?: question_log_topicUncheckedCreateNestedManyWithoutQuestion_logInput
  }

  export type question_logCreateOrConnectWithoutQuestion_log_questionInput = {
    where: question_logWhereUniqueInput
    create: XOR<question_logCreateWithoutQuestion_log_questionInput, question_logUncheckedCreateWithoutQuestion_log_questionInput>
  }

  export type question_keywordCreateWithoutQuestion_log_questionInput = {
    created_at?: Date | string
    keyword: string
    uuid?: string
    explanation?: string | null
    example?: string | null
  }

  export type question_keywordUncheckedCreateWithoutQuestion_log_questionInput = {
    id?: number
    created_at?: Date | string
    keyword: string
    uuid?: string
    explanation?: string | null
    example?: string | null
  }

  export type question_keywordCreateOrConnectWithoutQuestion_log_questionInput = {
    where: question_keywordWhereUniqueInput
    create: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput>
  }

  export type question_keywordCreateManyQuestion_log_questionInputEnvelope = {
    data: question_keywordCreateManyQuestion_log_questionInput | question_keywordCreateManyQuestion_log_questionInput[]
    skipDuplicates?: boolean
  }

  export type question_logUpsertWithoutQuestion_log_questionInput = {
    update: XOR<question_logUpdateWithoutQuestion_log_questionInput, question_logUncheckedUpdateWithoutQuestion_log_questionInput>
    create: XOR<question_logCreateWithoutQuestion_log_questionInput, question_logUncheckedCreateWithoutQuestion_log_questionInput>
    where?: question_logWhereInput
  }

  export type question_logUpdateToOneWithWhereWithoutQuestion_log_questionInput = {
    where?: question_logWhereInput
    data: XOR<question_logUpdateWithoutQuestion_log_questionInput, question_logUncheckedUpdateWithoutQuestion_log_questionInput>
  }

  export type question_logUpdateWithoutQuestion_log_questionInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_generator?: participantUpdateOneRequiredWithoutQuestion_logNestedInput
    question_department?: departmentUpdateOneRequiredWithoutQuestion_log_question_departmentNestedInput
    topics?: question_log_topicUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateWithoutQuestion_log_questionInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: question_log_topicUncheckedUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_keywordUpsertWithWhereUniqueWithoutQuestion_log_questionInput = {
    where: question_keywordWhereUniqueInput
    update: XOR<question_keywordUpdateWithoutQuestion_log_questionInput, question_keywordUncheckedUpdateWithoutQuestion_log_questionInput>
    create: XOR<question_keywordCreateWithoutQuestion_log_questionInput, question_keywordUncheckedCreateWithoutQuestion_log_questionInput>
  }

  export type question_keywordUpdateWithWhereUniqueWithoutQuestion_log_questionInput = {
    where: question_keywordWhereUniqueInput
    data: XOR<question_keywordUpdateWithoutQuestion_log_questionInput, question_keywordUncheckedUpdateWithoutQuestion_log_questionInput>
  }

  export type question_keywordUpdateManyWithWhereWithoutQuestion_log_questionInput = {
    where: question_keywordScalarWhereInput
    data: XOR<question_keywordUpdateManyMutationInput, question_keywordUncheckedUpdateManyWithoutQuestion_log_questionInput>
  }

  export type question_keywordScalarWhereInput = {
    AND?: question_keywordScalarWhereInput | question_keywordScalarWhereInput[]
    OR?: question_keywordScalarWhereInput[]
    NOT?: question_keywordScalarWhereInput | question_keywordScalarWhereInput[]
    id?: IntFilter<"question_keyword"> | number
    created_at?: DateTimeFilter<"question_keyword"> | Date | string
    keyword?: StringFilter<"question_keyword"> | string
    question_id?: IntFilter<"question_keyword"> | number
    uuid?: UuidFilter<"question_keyword"> | string
    explanation?: StringNullableFilter<"question_keyword"> | string | null
    example?: StringNullableFilter<"question_keyword"> | string | null
  }

  export type question_log_questionCreateWithoutQuestion_keywordInput = {
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
    question_log: question_logCreateNestedOneWithoutQuestion_log_questionInput
  }

  export type question_log_questionUncheckedCreateWithoutQuestion_keywordInput = {
    id?: number
    question_log_id: number
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
  }

  export type question_log_questionCreateOrConnectWithoutQuestion_keywordInput = {
    where: question_log_questionWhereUniqueInput
    create: XOR<question_log_questionCreateWithoutQuestion_keywordInput, question_log_questionUncheckedCreateWithoutQuestion_keywordInput>
  }

  export type question_log_questionUpsertWithoutQuestion_keywordInput = {
    update: XOR<question_log_questionUpdateWithoutQuestion_keywordInput, question_log_questionUncheckedUpdateWithoutQuestion_keywordInput>
    create: XOR<question_log_questionCreateWithoutQuestion_keywordInput, question_log_questionUncheckedCreateWithoutQuestion_keywordInput>
    where?: question_log_questionWhereInput
  }

  export type question_log_questionUpdateToOneWithWhereWithoutQuestion_keywordInput = {
    where?: question_log_questionWhereInput
    data: XOR<question_log_questionUpdateWithoutQuestion_keywordInput, question_log_questionUncheckedUpdateWithoutQuestion_keywordInput>
  }

  export type question_log_questionUpdateWithoutQuestion_keywordInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_log?: question_logUpdateOneRequiredWithoutQuestion_log_questionNestedInput
  }

  export type question_log_questionUncheckedUpdateWithoutQuestion_keywordInput = {
    id?: IntFieldUpdateOperationsInput | number
    question_log_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type topicCreateManyDepartment_topic_departmentTodepartmentInput = {
    id?: number
    created_at?: Date | string
    name?: string | null
    uuid?: string
  }

  export type question_logCreateManyQuestion_departmentInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    participant: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
  }

  export type topicUpdateWithoutDepartment_topic_departmentTodepartmentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
    question_logs?: question_log_topicUpdateManyWithoutTopicNestedInput
  }

  export type topicUncheckedUpdateWithoutDepartment_topic_departmentTodepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
    question_logs?: question_log_topicUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type topicUncheckedUpdateManyWithoutDepartment_topic_departmentTodepartmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_logUpdateWithoutQuestion_departmentInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_generator?: participantUpdateOneRequiredWithoutQuestion_logNestedInput
    topics?: question_log_topicUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateWithoutQuestion_departmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: question_log_topicUncheckedUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUncheckedUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateManyWithoutQuestion_departmentInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    participant?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_logCreateManyQuestion_generatorInput = {
    id?: number
    created_at?: Date | string
    uuid?: string
    department: number
    timer: number
    question_count: number
    difficulty: string
    completed?: boolean
    total_answers?: number
    total_correct?: number
    score?: number
    end_time?: Date | string | null
    timezone_offset?: number | null
    timezone_name?: string | null
  }

  export type question_logUpdateWithoutQuestion_generatorInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    question_department?: departmentUpdateOneRequiredWithoutQuestion_log_question_departmentNestedInput
    topics?: question_log_topicUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateWithoutQuestion_generatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
    topics?: question_log_topicUncheckedUpdateManyWithoutQuestion_logNestedInput
    question_log_question?: question_log_questionUncheckedUpdateManyWithoutQuestion_logNestedInput
  }

  export type question_logUncheckedUpdateManyWithoutQuestion_generatorInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    department?: IntFieldUpdateOperationsInput | number
    timer?: IntFieldUpdateOperationsInput | number
    question_count?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    completed?: BoolFieldUpdateOperationsInput | boolean
    total_answers?: IntFieldUpdateOperationsInput | number
    total_correct?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
    end_time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone_offset?: NullableIntFieldUpdateOperationsInput | number | null
    timezone_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_log_topicCreateManyTopicInput = {
    question_log_id: number
  }

  export type question_log_topicUpdateWithoutTopicInput = {
    question_log?: question_logUpdateOneRequiredWithoutTopicsNestedInput
  }

  export type question_log_topicUncheckedUpdateWithoutTopicInput = {
    question_log_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_topicUncheckedUpdateManyWithoutTopicInput = {
    question_log_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_topicCreateManyQuestion_logInput = {
    topic_id: number
  }

  export type question_log_questionCreateManyQuestion_logInput = {
    id?: number
    question: string
    options?: question_log_questionCreateoptionsInput | string[]
    answer?: question_log_questionCreateanswerInput | number[]
    explanation?: string | null
    topic?: string | null
    selected_answer?: question_log_questionCreateselected_answerInput | number[]
    question_type?: $Enums.QuestionType
    created_at?: Date | string
    uuid?: string
  }

  export type question_log_topicUpdateWithoutQuestion_logInput = {
    topic?: topicUpdateOneRequiredWithoutQuestion_logsNestedInput
  }

  export type question_log_topicUncheckedUpdateWithoutQuestion_logInput = {
    topic_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_topicUncheckedUpdateManyWithoutQuestion_logInput = {
    topic_id?: IntFieldUpdateOperationsInput | number
  }

  export type question_log_questionUpdateWithoutQuestion_logInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_keyword?: question_keywordUpdateManyWithoutQuestion_log_questionNestedInput
  }

  export type question_log_questionUncheckedUpdateWithoutQuestion_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
    question_keyword?: question_keywordUncheckedUpdateManyWithoutQuestion_log_questionNestedInput
  }

  export type question_log_questionUncheckedUpdateManyWithoutQuestion_logInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: question_log_questionUpdateoptionsInput | string[]
    answer?: question_log_questionUpdateanswerInput | number[]
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    selected_answer?: question_log_questionUpdateselected_answerInput | number[]
    question_type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    uuid?: StringFieldUpdateOperationsInput | string
  }

  export type question_keywordCreateManyQuestion_log_questionInput = {
    id?: number
    created_at?: Date | string
    keyword: string
    uuid?: string
    explanation?: string | null
    example?: string | null
  }

  export type question_keywordUpdateWithoutQuestion_log_questionInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_keywordUncheckedUpdateWithoutQuestion_log_questionInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type question_keywordUncheckedUpdateManyWithoutQuestion_log_questionInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    keyword?: StringFieldUpdateOperationsInput | string
    uuid?: StringFieldUpdateOperationsInput | string
    explanation?: NullableStringFieldUpdateOperationsInput | string | null
    example?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}