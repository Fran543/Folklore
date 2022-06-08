export function validateStory(title, summary, posts) {
    let isValid = true;
    if (title.length === 0 || summary.length === 0) {
        isValid = false;
    }
    if (posts.length === 0) {
        isValid = false;
    } else {
        for (const [index, post] of posts.entries()) {
            if (post.content.length === 0 || post.choices[0].choiceValue.length === 0 || post.choices[1].choiceValue.length === 0) {
                isValid = false;
            }
            if (index !== 0 && post.conditions.length === 0) {
                isValid = false;
            }
        }
    }
    return isValid;
}

export function validateBlog(title, summary, posts) {
    let isValid = true;
    if (title.length === 0 || summary.length === 0 || posts.length === 0) {
        isValid = false;
    }
    return isValid;
}