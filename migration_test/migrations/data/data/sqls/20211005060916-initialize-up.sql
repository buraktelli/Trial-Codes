/* Replace with your SQL commands */

CREATE TABLE public.burak_deneme
(
    id integer NOT NULL,
    name character varying COLLATE pg_catalog."default",
    lastname character varying COLLATE pg_catalog."default",
    CONSTRAINT burak_deneme_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.burak_deneme
    OWNER to postgres;



ALTER TABLE public.burak_deneme
    ADD COLUMN address character varying COLLATE pg_catalog."default";


ALTER TABLE public.burak_deneme
    ADD COLUMN addressVersionThree character varying COLLATE pg_catalog."default";