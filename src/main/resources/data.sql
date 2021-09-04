INSERT INTO person (
    first_name,
    last_name,
    email_address,
    street_address,
    city,
    state,
    zip_code,
    client_id
) VALUES (
    'John',
    'Smith',
    'fake1@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801',
    '1'
), (
    'Jane',
    'Smith',
    'fake2@aquent.com',
    '123 Any St.',
    'Asheville',
    'NC',
    '28801',
    '2'
);

INSERT INTO client (
    company_name,
    website_uri,
    phone_number,
    street_address,
    city,
    state,
    zip_code
) VALUES (
             'Burial',
             'https://burialbeer.com/',
             '9457634563',
             '40 Collier Ave',
             'Asheville',
             'NC',
             '28801'
         ), (
             'Green Man Brewery',
             'https://www.greenmanbrewery.com/',
             '9457634563',
             '27 Buxton Ave',
             'Asheville',
             'NC',
             '28801'
         );
