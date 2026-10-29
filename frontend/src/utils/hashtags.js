export function parseHashtags(text){
    return text
        .split(/[\s,]+/)
        .filter((tag) => tag.length > 0)
        .map ((tag) => (tag.startsWith("#") ? tag : `#${tag}`))

}