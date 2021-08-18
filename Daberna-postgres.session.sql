-- Create DB
CREATE DATABASE daberna;

-- users
-- DROP TABLE users;
CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    score INT DEFAULT 0 NOT NULL,
    balance NUMERIC(20, 0) DEFAULT 0,
    UNIQUE(username),
    UNIQUE(email),
    UNIQUE(phone)
);

create or replace function no_empty_string_in_email()
returns TRIGGER
language plpgsql
as $$
declare
-- variable declaration
begin
    NEW.email = nullif(OLD.email, '');
    return NEW;
end; $$;

CREATE TRIGGER null_email BEFORE INSERT OR UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE no_empty_string_in_email();


-- users
INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES (1, 'user1', 'Zr', 'user1', 'user1@gmail.com', '+12401111111', 'password1');
INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES (2, 'user2', 'Lb', 'user2', '', '+12402222222', 'password2');


-- Cards
-- DROP TABLE cards;
CREATE TABLE cards(
    id BIGSERIAL PRIMARY KEY,
    numbers INT[][2] NOT NULL
);

INSERT INTO cards(numbers) VALUES ( '{{2, 1}, {1, 2}, {2, 7}, {5, 18}, {5, 13}, {7, 27}, {7, 24}, {9, 33}, {11, 37}, {13, 44}, {15, 50}, {16, 55}, {18, 62}, {21, 79}, {25, 87}, {26, 90}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 2}, {0, 7}, {0, 4}, {5, 16}, {5, 14}, {6, 28}, {9, 35}, {9, 39}, {14, 46}, {12, 42}, {15, 53}, {15, 50}, {20, 63}, {23, 75}, {23, 74}, {25, 82}, {26, 80}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 3}, {2, 4}, {2, 9}, {3, 19}, {7, 29}, {9, 31}, {9, 34}, {13, 46}, {13, 40}, {16, 50}, {15, 59}, {20, 65}, {22, 70}, {21, 76}, {24, 82}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 4}, {0, 1}, {2, 6}, {3, 10}, {6, 28}, {8, 21}, {9, 33}, {9, 31}, {14, 40}, {16, 53}, {17, 58}, {18, 61}, {20, 68}, {21, 78}, {23, 79}, {25, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 5}, {1, 1}, {5, 13}, {4, 15}, {7, 21}, {9, 37}, {12, 48}, {13, 45}, {17, 56}, {17, 58}, {19, 64}, {22, 79}, {23, 71}, {26, 83}, {26, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 6}, {1, 4}, {4, 13}, {3, 10}, {6, 20}, {8, 23}, {10, 30}, {11, 33}, {13, 47}, {12, 45}, {16, 58}, {20, 61}, {19, 66}, {21, 75}, {22, 72}, {21, 76}, {26, 84}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 7}, {1, 3}, {2, 5}, {5, 16}, {3, 14}, {6, 22}, {9, 39}, {13, 42}, {13, 47}, {16, 54}, {17, 59}, {18, 68}, {20, 62}, {21, 75}, {24, 82}, {25, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 8}, {0, 2}, {1, 6}, {3, 12}, {7, 23}, {6, 27}, {10, 34}, {10, 30}, {12, 46}, {14, 47}, {16, 52}, {17, 53}, {20, 62}, {19, 65}, {23, 70}, {26, 85}, {24, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 9}, {2, 5}, {2, 9}, {5, 18}, {3, 15}, {8, 29}, {11, 35}, {9, 39}, {14, 42}, {15, 51}, {15, 53}, {20, 64}, {20, 66}, {23, 75}, {26, 89}, {26, 83}}' );
INSERT INTO cards(numbers) VALUES ( '{{3, 10}, {0, 8}, {0, 7}, {4, 12}, {8, 22}, {6, 26}, {10, 31}, {12, 44}, {14, 48}, {17, 57}, {20, 60}, {20, 63}, {23, 77}, {21, 73}, {25, 83}, {25, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 11}, {0, 2}, {4, 10}, {5, 16}, {7, 23}, {8, 27}, {6, 26}, {9, 31}, {10, 37}, {14, 47}, {15, 57}, {18, 66}, {22, 78}, {22, 72}, {24, 85}, {24, 81}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 12}, {0, 3}, {1, 8}, {5, 19}, {8, 22}, {7, 25}, {9, 31}, {11, 33}, {12, 40}, {17, 57}, {17, 59}, {19, 61}, {18, 63}, {23, 72}, {24, 86}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 13}, {2, 9}, {5, 11}, {5, 16}, {8, 24}, {11, 30}, {11, 39}, {12, 46}, {12, 41}, {16, 57}, {15, 59}, {20, 69}, {23, 75}, {21, 71}, {25, 84}, {25, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 14}, {0, 8}, {3, 13}, {3, 17}, {6, 22}, {6, 25}, {10, 33}, {9, 34}, {12, 43}, {16, 56}, {17, 58}, {18, 64}, {19, 66}, {23, 71}, {26, 81}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 15}, {2, 8}, {1, 9}, {3, 11}, {8, 21}, {8, 27}, {10, 32}, {13, 45}, {14, 44}, {15, 57}, {15, 54}, {18, 65}, {20, 67}, {21, 73}, {26, 89}, {25, 85}}' );
INSERT INTO cards(numbers) VALUES ( '{{5, 16}, {0, 3}, {3, 14}, {4, 17}, {8, 26}, {9, 38}, {9, 35}, {13, 40}, {12, 49}, {17, 59}, {15, 53}, {20, 64}, {20, 62}, {22, 77}, {23, 79}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{4, 17}, {1, 7}, {3, 19}, {4, 10}, {8, 26}, {10, 38}, {12, 41}, {13, 46}, {15, 56}, {19, 68}, {19, 64}, {21, 73}, {21, 77}, {26, 90}, {24, 84}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{5, 18}, {1, 1}, {0, 3}, {5, 17}, {7, 21}, {6, 29}, {9, 35}, {14, 41}, {12, 47}, {15, 56}, {15, 52}, {20, 60}, {19, 63}, {23, 76}, {21, 74}, {24, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{5, 19}, {0, 6}, {1, 8}, {5, 19}, {8, 23}, {10, 34}, {11, 39}, {14, 43}, {12, 44}, {15, 57}, {16, 50}, {20, 67}, {19, 66}, {23, 79}, {24, 85}, {24, 80}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 20}, {0, 2}, {2, 3}, {4, 16}, {7, 21}, {6, 25}, {10, 37}, {11, 32}, {12, 44}, {17, 56}, {17, 58}, {20, 62}, {20, 68}, {23, 73}, {23, 79}, {25, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 21}, {2, 3}, {2, 4}, {3, 10}, {7, 27}, {11, 30}, {9, 39}, {13, 46}, {13, 42}, {17, 51}, {18, 67}, {19, 61}, {23, 71}, {21, 72}, {25, 85}, {25, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 22}, {2, 5}, {4, 10}, {5, 15}, {8, 28}, {7, 26}, {10, 38}, {13, 48}, {12, 41}, {15, 52}, {16, 50}, {18, 60}, {22, 79}, {22, 72}, {25, 83}, {25, 84}}' );
INSERT INTO cards(numbers) VALUES ( '{{6, 23}, {0, 1}, {2, 7}, {5, 12}, {8, 21}, {7, 23}, {7, 25}, {10, 31}, {13, 47}, {17, 54}, {15, 50}, {18, 60}, {21, 73}, {22, 70}, {24, 80}, {25, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 24}, {1, 8}, {0, 3}, {3, 14}, {3, 19}, {8, 20}, {11, 36}, {10, 37}, {13, 48}, {13, 45}, {16, 56}, {18, 62}, {19, 68}, {21, 74}, {25, 86}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 25}, {0, 7}, {4, 11}, {5, 18}, {6, 27}, {10, 33}, {13, 42}, {12, 48}, {15, 51}, {20, 61}, {18, 64}, {23, 70}, {23, 75}, {26, 90}, {26, 86}, {26, 83}}' );
INSERT INTO cards(numbers) VALUES ( '{{6, 26}, {2, 5}, {1, 8}, {3, 17}, {7, 26}, {6, 27}, {11, 37}, {12, 41}, {14, 44}, {15, 55}, {20, 65}, {20, 63}, {23, 74}, {21, 75}, {25, 80}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{8, 27}, {0, 2}, {2, 5}, {5, 14}, {6, 22}, {7, 24}, {11, 35}, {13, 47}, {12, 41}, {15, 52}, {15, 54}, {18, 64}, {21, 71}, {22, 77}, {26, 90}, {25, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{6, 28}, {2, 6}, {4, 19}, {6, 20}, {8, 22}, {11, 30}, {10, 36}, {12, 41}, {14, 46}, {17, 56}, {15, 59}, {19, 62}, {20, 69}, {18, 63}, {22, 76}, {24, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{7, 29}, {0, 3}, {0, 7}, {3, 13}, {3, 16}, {6, 27}, {6, 20}, {11, 38}, {10, 33}, {12, 45}, {17, 55}, {20, 67}, {19, 69}, {23, 74}, {25, 81}, {24, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{9, 30}, {1, 6}, {2, 9}, {3, 13}, {8, 20}, {6, 25}, {9, 31}, {14, 44}, {13, 42}, {16, 56}, {15, 59}, {18, 69}, {18, 60}, {22, 71}, {22, 74}, {26, 90}}' );
