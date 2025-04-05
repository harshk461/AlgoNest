function snakeToTitleCase(str) {
    return str
        .split('_')  // Split by underscore
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
        .join(' '); // Join with space
}


const toReadableFormat = (str) => {
    if(!str){
        return "";
    }

    if (str === str?.toUpperCase()) {
        // Convert fully uppercase words to sentence case
        return str.charAt(0) + str.slice(1).toLowerCase();
    }

    return str
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camelCase transitions
        .replace(/^./, (char) => char.toUpperCase()); // Capitalize first letter
};


module.exports={
    snakeToTitleCase,
    toReadableFormat
}