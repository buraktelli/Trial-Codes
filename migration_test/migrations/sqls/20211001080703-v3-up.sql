/* Replace with your SQL commands */

CREATE TABLE public.burak_deneme3
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    lastname character varying COLLATE pg_catalog."default",
    CONSTRAINT burak_deneme3_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.burak_deneme3
    OWNER to postgres;



ALTER TABLE public.burak_deneme3
    ADD COLUMN address character varying COLLATE pg_catalog."default";


ALTER TABLE public.burak_deneme3
    ADD COLUMN addressVersionThree character varying COLLATE pg_catalog."default";
