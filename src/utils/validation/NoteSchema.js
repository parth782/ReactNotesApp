const NoteSchema = {
    title: {
        required: {
            value: true,
            message: "Title is required"
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Title must not contain any spaces"
        },
        minLength: {
            value: 5,
            message: "Title must be at least 5 characters"
        }
    },
    description: {
        required: {
            value: true,
            message: "Description is required"
        },
        pattern: {
            value: /^[^\s].*[^\s]$/,
            message: "Description must not contain any spaces"
        },
        minLength: {
            value: 10,
            message: "Description must be at least 10 characters"
        }
    },
    tag: {
        required: {
            value: true,
            message: "Tag is required"
        },
        validate: (value) => {
            if(value === "Pending" || value === "Completed"){
                return true;
            }
            else{
                return "Tag must be either Pending or Completed";
            }
        }
    }

}
export default NoteSchema;