document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");

    // Cards Data inside the elements array
    const elements = [
        {
            tagName: "section",
            className: "container",
            children: [
                {
                    tagName: "div",
                    id: "head-container",
                    children: [
                        {
                            tagName: "h1",
                            content: "Last works"
                        },
                        {
                            tagName: "button",
                            id: "explore-showcase",
                            content: "Explore Showcase"
                        }
                    ]
                },
                {
                    tagName: "div",
                    id: "cards-container",
                    children: [
                        {
                            tagName: "div",
                            className: "card",
                            id: "postcard-first",
                            children: [
                                {
                                    tagName: "h2",
                                    content: "Startup Framework"
                                },
                                {
                                    tagName: "p",
                                    content: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements."
                                },
                                {
                                    tagName: "button",
                                    content: "Explore"
                                }
                            ]
                        },
                        {
                            tagName: "div",
                            className: "card",
                            id: "postcard-second",
                            children: [
                                {
                                    tagName: "h2",
                                    content: "Web Generator"
                                },
                                {
                                    tagName: "p",
                                    content: "Startup is a powerful tool for quick and convenient proto-typing of your projects. It will fit most projects because it contains up-to-date and modern web elements."
                                },
                                {
                                    tagName: "button",
                                    content: "Explore"
                                }
                            ]
                        },
                        {
                            tagName: "div",
                            className: "card",
                            id: "postcard-third",
                            children: [
                                { tagName: "h2", content: "Slides 4" },
                                { tagName: "p", content: "All of these components are made in the same style, and can easily be inegrated into projects, allowing you to create hundreds of solutions for your future projects." },
                                { tagName: "button", content: "Explore" }
                            ]
                        },
                        {
                            tagName: "div",
                            className: "card",
                            id: "postcard-fourth",
                            children: [
                                { tagName: "h2", content: "Postcards" },
                                { tagName: "p", content: "All frequently used elements are now in symbols. Use them to create interfaces really fast. Easily change icons, colors and text. Add new symbols to customize your design." },
                                { tagName: "button", content: "Explore" }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    // Function to create elements
    const createNode = (element) => {
        const node = document.createElement(element.tagName);
        if (element.className)
            node.className = element.className;
        if (element.id)
            node.id = element.id;
        if (element.content)
            node.innerHTML = element.content;
        if (element.children) {
            element.children.forEach(child => {
                node.appendChild(createNode(child));
            });
        }
        return node;
    };

    elements.forEach(element => {
        app.appendChild(createNode(element));
    });
});
