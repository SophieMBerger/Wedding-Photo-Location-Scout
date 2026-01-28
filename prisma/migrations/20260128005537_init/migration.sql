-- AlterTable
CREATE SEQUENCE location_id_seq;
ALTER TABLE "Location" ALTER COLUMN "id" SET DEFAULT nextval('location_id_seq');
ALTER SEQUENCE location_id_seq OWNED BY "Location"."id";
