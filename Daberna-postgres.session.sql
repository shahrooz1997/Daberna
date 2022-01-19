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
    IF TG_OP = 'UPDATE' THEN
        NEW.email = nullif(OLD.email, '');
    END IF;
    return NEW;
end; $$;

CREATE TRIGGER null_email BEFORE INSERT OR UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE no_empty_string_in_email();


-- users
INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES (1, 'user1', 'Zr', 'user1', 'user1@gmail.com', '+12401111111', '1');
INSERT INTO users (id, firstname, lastname, username, email, phone, password) VALUES (2, 'user2', 'Lb', 'user2', '', '+12402222222', '2');
INSERT INTO users (id, firstname, lastname, username, email, phone, password, balance) VALUES (4, 'user3', 'Zr', 'user3', 'user3@gmail.com', '+1240113333', '3', 20);


-- Cards
DROP TABLE cards;
CREATE TABLE cards(
    id BIGSERIAL PRIMARY KEY,
    numbers INT[][2] NOT NULL
);

INSERT INTO cards(numbers) VALUES ( '{{0, 2}, {2, 7}, {3, 18}, {4, 13}, {7, 27}, {6, 24}, {9, 33}, {11, 37}, {14, 44}, {15, 50}, {16, 55}, {18, 62}, {21, 79}, {25, 87}, {26, 90}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 7}, {1, 4}, {4, 16}, {3, 14}, {6, 28}, {11, 35}, {10, 39}, {14, 46}, {15, 53}, {17, 50}, {19, 63}, {22, 75}, {21, 74}, {26, 82}, {24, 80}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 4}, {0, 9}, {5, 19}, {6, 29}, {10, 31}, {9, 34}, {13, 46}, {14, 40}, {15, 50}, {17, 59}, {19, 65}, {21, 70}, {23, 76}, {24, 82}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 1}, {1, 6}, {4, 10}, {7, 28}, {6, 21}, {10, 33}, {11, 31}, {12, 40}, {17, 53}, {16, 58}, {18, 61}, {19, 68}, {23, 78}, {21, 79}, {26, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 1}, {3, 13}, {4, 15}, {6, 21}, {8, 28}, {9, 37}, {14, 48}, {13, 45}, {16, 56}, {17, 58}, {20, 64}, {21, 79}, {23, 71}, {25, 83}, {24, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 4}, {5, 10}, {8, 20}, {7, 23}, {9, 30}, {10, 33}, {14, 47}, {12, 45}, {17, 58}, {20, 61}, {18, 66}, {21, 75}, {23, 72}, {22, 76}, {25, 84}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 3}, {2, 5}, {4, 16}, {3, 14}, {6, 22}, {11, 39}, {13, 42}, {12, 47}, {16, 54}, {15, 59}, {20, 68}, {19, 62}, {22, 75}, {24, 82}, {26, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 2}, {1, 6}, {4, 12}, {8, 23}, {7, 27}, {11, 34}, {9, 30}, {14, 46}, {13, 47}, {15, 52}, {17, 53}, {18, 62}, {22, 70}, {25, 85}, {26, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 5}, {2, 9}, {5, 18}, {3, 15}, {6, 29}, {9, 35}, {10, 39}, {13, 42}, {15, 51}, {16, 53}, {20, 64}, {18, 66}, {21, 75}, {24, 89}, {26, 83}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 8}, {0, 7}, {3, 12}, {8, 22}, {6, 26}, {10, 31}, {13, 44}, {12, 48}, {17, 57}, {20, 60}, {19, 63}, {21, 77}, {22, 73}, {24, 83}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 2}, {5, 10}, {4, 16}, {6, 23}, {7, 27}, {8, 26}, {10, 31}, {11, 37}, {12, 47}, {15, 57}, {18, 66}, {22, 78}, {21, 72}, {25, 85}, {24, 81}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 3}, {0, 8}, {5, 19}, {6, 22}, {7, 25}, {10, 31}, {9, 33}, {14, 40}, {15, 57}, {16, 59}, {20, 61}, {19, 63}, {21, 72}, {25, 86}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 9}, {5, 11}, {4, 16}, {8, 24}, {10, 30}, {9, 39}, {12, 46}, {14, 41}, {16, 57}, {15, 59}, {19, 69}, {21, 75}, {23, 71}, {26, 84}, {25, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 8}, {3, 13}, {5, 17}, {7, 22}, {6, 25}, {9, 33}, {10, 34}, {12, 43}, {17, 56}, {16, 58}, {19, 64}, {18, 66}, {21, 71}, {24, 81}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 8}, {1, 9}, {4, 11}, {6, 21}, {8, 27}, {10, 32}, {12, 45}, {13, 44}, {15, 57}, {16, 54}, {19, 65}, {18, 67}, {22, 73}, {26, 89}, {25, 85}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 3}, {4, 14}, {5, 17}, {6, 26}, {9, 38}, {11, 35}, {13, 40}, {12, 49}, {15, 59}, {17, 53}, {20, 64}, {18, 62}, {22, 77}, {23, 79}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 7}, {4, 19}, {3, 10}, {6, 26}, {10, 38}, {12, 41}, {13, 46}, {15, 56}, {19, 68}, {18, 64}, {21, 73}, {22, 77}, {26, 90}, {24, 84}, {25, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 1}, {2, 3}, {4, 17}, {8, 21}, {7, 29}, {9, 35}, {14, 41}, {12, 47}, {17, 56}, {16, 52}, {20, 60}, {19, 63}, {23, 76}, {21, 74}, {24, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 6}, {0, 8}, {3, 19}, {6, 23}, {11, 34}, {9, 39}, {14, 43}, {13, 44}, {15, 57}, {17, 50}, {18, 67}, {19, 66}, {21, 79}, {24, 85}, {26, 80}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 2}, {0, 3}, {5, 16}, {8, 21}, {6, 25}, {9, 37}, {10, 32}, {13, 44}, {15, 56}, {17, 58}, {20, 62}, {19, 68}, {23, 73}, {22, 79}, {24, 87}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 3}, {2, 4}, {3, 10}, {8, 27}, {10, 30}, {9, 39}, {12, 46}, {14, 42}, {15, 51}, {19, 67}, {18, 61}, {21, 71}, {22, 72}, {24, 85}, {25, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 5}, {3, 10}, {5, 15}, {7, 28}, {8, 26}, {10, 38}, {13, 48}, {12, 41}, {15, 52}, {16, 50}, {20, 60}, {21, 79}, {23, 72}, {24, 83}, {25, 84}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 1}, {2, 7}, {3, 12}, {7, 21}, {6, 23}, {8, 25}, {11, 31}, {12, 47}, {15, 54}, {17, 50}, {20, 60}, {21, 73}, {23, 70}, {25, 80}, {24, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 8}, {2, 3}, {4, 14}, {5, 19}, {6, 20}, {11, 36}, {10, 37}, {12, 48}, {14, 45}, {15, 56}, {18, 62}, {20, 68}, {22, 74}, {26, 86}, {24, 82}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 7}, {3, 11}, {4, 18}, {7, 27}, {10, 33}, {12, 42}, {13, 48}, {15, 51}, {18, 61}, {19, 64}, {22, 70}, {21, 75}, {26, 90}, {24, 86}, {25, 83}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 5}, {2, 8}, {3, 17}, {8, 26}, {7, 27}, {9, 37}, {13, 41}, {12, 44}, {15, 55}, {19, 65}, {18, 63}, {22, 74}, {21, 75}, {24, 80}, {26, 88}}' );
INSERT INTO cards(numbers) VALUES ( '{{0, 2}, {1, 5}, {4, 14}, {6, 22}, {7, 24}, {9, 35}, {13, 47}, {12, 41}, {16, 52}, {15, 54}, {19, 64}, {22, 71}, {21, 77}, {26, 90}, {24, 89}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 6}, {3, 19}, {6, 20}, {8, 22}, {9, 30}, {11, 36}, {13, 41}, {14, 46}, {15, 56}, {17, 59}, {20, 62}, {19, 69}, {18, 63}, {22, 76}, {26, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{2, 3}, {1, 7}, {3, 13}, {4, 16}, {8, 27}, {7, 20}, {11, 38}, {9, 33}, {12, 45}, {15, 55}, {18, 67}, {20, 69}, {22, 74}, {24, 81}, {26, 86}}' );
INSERT INTO cards(numbers) VALUES ( '{{1, 6}, {0, 9}, {3, 13}, {6, 20}, {7, 25}, {9, 31}, {13, 44}, {12, 42}, {16, 56}, {15, 59}, {18, 69}, {19, 60}, {21, 71}, {22, 74}, {26, 90}}' );
