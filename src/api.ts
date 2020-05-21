export const books = [
    { title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", themes: ["Magic", "Voldemort", "Family"] },
    {
        title: "One Hundred Years of Solittude",
        author: "Garbriel Garcia Marquez",
        themes: ["Magic", "Time"],
    },
    {
        title: "Moby Dick",
        author: "Herman Melville",
        themes: ["Whales", "Higher Power", "Humor"],
    },
    {
        title: "Catch-22",
        author: "Joseph Heller",
        themes: ["War", "Satire", "Humor"],
    },
    {
        title: "Candide",
        author: "Voltaire",
        themes: ["Voldemort", "Satire"],
    },
    {
        title: "War and Peace",
        author: "Leo Tolstoy",
        themes: ["War", "Peace", "Time"],
    },
    { title: "Master and Margarita", author: "Mikhail Bulgakov", themes: ["Magic", "Devil", "Pontius Pilot"] },
];

export const getBooks = () => {
    new Promise(() =>
        setTimeout(() => {
            return books;
        }, Math.floor(Math.random() * 800) + 100)
    );
};
