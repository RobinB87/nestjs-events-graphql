INSERT INTO "user" ("username","password","email","firstName","lastName")
VALUES
    (
        'e2e-test',
        '$2b$10$5v5ZIVbPGXf0126yUiiys.z/POxSaus.iSbzXj7cTRW9KWGy5bfcq',
        'e2e@test.com',
        'End',
        'To End'
    );

INSERT INTO "event" ("description","when","address","name","organizerId")
VALUES
    (
        'That is a crazy event, must go there!',
        '2021-04-15 21:00:00',
        'Local St 101',
        'Interesting Party',
        1
    )