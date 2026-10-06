import { pool } from './database.js';
import './dotenv.js'

const resetDatabase = async () => {
    try {
        await pool.query(`
            DROP TABLE IF EXISTS events;
            DROP TABLE IF EXISTS locations;
        `);
        console.log('Successfully dropped old tables.');

        await pool.query(`
            CREATE TABLE locations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(255) NOT NULL,
                city VARCHAR(100) NOT NULL,
                state VARCHAR(50) NOT NULL,
                image VARCHAR(255)
            );
        `);
        console.log('Successfully created locations table.');

        await pool.query(`
            CREATE TABLE events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date VARCHAR(100) NOT NULL,
                time VARCHAR(100) NOT NULL,
                image VARCHAR(255) NOT NULL,
                remaining VARCHAR(100),
                location_id INT,
                FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
            );
        `);
        console.log('Successfully created events table.');

        await pool.query(`
            INSERT INTO locations (name, address, city, state, image) VALUES
            ('Echo Lounge & Music Hall', '1325 Botham Jean Blvd', 'Dallas', 'TX', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'),
            ('House of Blues', '2200 N Lamar St', 'Dallas', 'TX', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745'),
            ('The Pavilion at Toyota Music Factory', '309 W Las Colinas Blvd', 'Irving', 'TX', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14'),
            ('American Airlines Center', '2500 Victory Ave', 'Dallas', 'TX', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7');
        `);
        console.log('Successfully seeded locations data.');

        await pool.query(`
            INSERT INTO events (title, date, time, image, remaining, location_id) VALUES
            ('Summer Music Fest', '2026-07-15', '18:00:00', 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745', '3 days', 1),
            ('Indie Rock Night', '2026-08-20', '20:00:00', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819', '5 days', 2),
            ('Symphony Under the Stars', '2026-09-05', '19:30:00', 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14', '8 days', 3),
            ('Electronic Odyssey', '2026-09-10', '21:30:00', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7', '12 days', 4);
        `);
        console.log('Successfully seeded events data.');

    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        pool.end();
    }
};

resetDatabase();