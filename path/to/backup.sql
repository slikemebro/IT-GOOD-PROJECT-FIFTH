-- H2 2.2.224;
;             
CREATE USER IF NOT EXISTS "SA" SALT 'bf8585a961906093' HASH 'fae7649f7d7faadeb7b235ad3c0bd896c68dc185e8f7767a272f9ac8e6c2e512' ADMIN;         
CREATE SEQUENCE "PUBLIC"."LESSONS_BALANCE_SEQ" START WITH 1 INCREMENT BY 50;  
CREATE SEQUENCE "PUBLIC"."LESSON_SEQ" START WITH 1 INCREMENT BY 50;           
CREATE SEQUENCE "PUBLIC"."PAYMENT_SEQ" START WITH 1 INCREMENT BY 50;          
CREATE SEQUENCE "PUBLIC"."STUDENT_SEQ" START WITH 1 INCREMENT BY 50;          
CREATE SEQUENCE "PUBLIC"."TABLE_TEACHER_STUDENT_SEQ" START WITH 1 INCREMENT BY 50;            
CREATE SEQUENCE "PUBLIC"."TEACHER_SEQ" START WITH 1 INCREMENT BY 50;          
CREATE MEMORY TABLE "PUBLIC"."LESSON"(
    "STATUS" TINYINT,
    "END_DATE_TIME" TIMESTAMP(6),
    "ID" BIGINT NOT NULL,
    "START_DATE_TIME" TIMESTAMP(6),
    "STUDENT_ID" BIGINT,
    "TEACHER_ID" BIGINT,
    "THEME" CHARACTER VARYING(255)
);  
ALTER TABLE "PUBLIC"."LESSON" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8" PRIMARY KEY("ID");       
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.LESSON;  
INSERT INTO "PUBLIC"."LESSON" VALUES
(2, TIMESTAMP '2023-01-01 15:23:34', 0, TIMESTAMP '2023-01-01 15:23:34', 0, 0, 'Java'),
(2, TIMESTAMP '2023-01-01 15:23:34', 1, TIMESTAMP '2023-01-01 15:23:34', 0, 0, 'C++');         
CREATE MEMORY TABLE "PUBLIC"."LESSON_IDS"(
    "LESSON_ID" BIGINT,
    "RELATION_ID" BIGINT NOT NULL
);    
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.LESSON_IDS;              
INSERT INTO "PUBLIC"."LESSON_IDS" VALUES
(0, 0),
(1, 0);    
CREATE MEMORY TABLE "PUBLIC"."LESSONS_BALANCE"(
    "LESSONS_BALANCE" INTEGER,
    "ID" BIGINT NOT NULL,
    "STUDENT_ID" BIGINT
);       
ALTER TABLE "PUBLIC"."LESSONS_BALANCE" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_7" PRIMARY KEY("ID");              
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.LESSONS_BALANCE;         
CREATE MEMORY TABLE "PUBLIC"."PAYMENT"(
    "AMOUNT" FLOAT(53),
    "LESSONS_AMOUNT" INTEGER,
    "ID" BIGINT NOT NULL,
    "PAYMENT_DATE_TIME" TIMESTAMP(6),
    "STUDENT_ID" BIGINT
);
ALTER TABLE "PUBLIC"."PAYMENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_F" PRIMARY KEY("ID");      
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.PAYMENT; 
CREATE MEMORY TABLE "PUBLIC"."STUDENT"(
    "ACTIVE" BOOLEAN,
    "AGE" INTEGER,
    "ID" BIGINT NOT NULL,
    "NAME" CHARACTER VARYING(255),
    "SURNAME" CHARACTER VARYING(255)
);   
ALTER TABLE "PUBLIC"."STUDENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_B" PRIMARY KEY("ID");      
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.STUDENT; 
INSERT INTO "PUBLIC"."STUDENT" VALUES
(TRUE, 16, 0, U&'\041c\0430\043a\0441\0438\043c', U&'\0422\043e\0440\044f\043d\0438\043a');            
CREATE MEMORY TABLE "PUBLIC"."TABLE_TEACHER_STUDENT"(
    "ACTIVE" BOOLEAN,
    "ID" BIGINT NOT NULL,
    "STUDENT_ID" BIGINT,
    "TEACHER_ID" BIGINT
);
ALTER TABLE "PUBLIC"."TABLE_TEACHER_STUDENT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_3" PRIMARY KEY("ID");        
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.TABLE_TEACHER_STUDENT;   
INSERT INTO "PUBLIC"."TABLE_TEACHER_STUDENT" VALUES
(TRUE, 0, 0, 0);         
CREATE MEMORY TABLE "PUBLIC"."TEACHER"(
    "ACTIVE" BOOLEAN,
    "AGE" INTEGER,
    "ID" BIGINT NOT NULL,
    "CARD_NAME" CHARACTER VARYING(255),
    "CARD_NUMBER" CHARACTER VARYING(255),
    "CONTACTS" CHARACTER VARYING(255),
    "NAME" CHARACTER VARYING(255),
    "SURNAME" CHARACTER VARYING(255)
);       
ALTER TABLE "PUBLIC"."TEACHER" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_D" PRIMARY KEY("ID");      
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.TEACHER; 
INSERT INTO "PUBLIC"."TEACHER" VALUES
(TRUE, 20, 0, U&'\041c\043e\043d\043e', '1234 56583 231 2332', '@lerraa', U&'\0412\0430\043b\0435\0440\0456\044f', U&'\041f\043e\0434\043f\043e\0440\0456\043d\043e\0432\0430');       
ALTER TABLE "PUBLIC"."LESSON_IDS" ADD CONSTRAINT "PUBLIC"."FKCVKBLI1088COK5XA6AFOUYE9Y" FOREIGN KEY("RELATION_ID") REFERENCES "PUBLIC"."TABLE_TEACHER_STUDENT"("ID") NOCHECK; 
