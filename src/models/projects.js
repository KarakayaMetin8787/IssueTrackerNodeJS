import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        _id: { type: String },
        bezeichnung: { type: String },
        erstellt_von: {
            _id: { type: String },
            vorname: { type: String },
            nachname: { type: String },
        },
        bearbeiter: [
            {
                _id: { type: String },
                vorname: { type: String },
                nachname: { type: String },
            },
        ],
        status: { type: String },
        kommentare: [
            {
                kommentar_id: { type: String },
                user_id: { type: String },
                vorname: { type: String },
                nachname: { type: String },
                text: { type: String },
                screenshot: { type: String }
            },
        ],
        dueDate: { type: String },
        priorität: { type: String },
    },
    { collection: "projects", timestamps: true }
);

export const Projects = mongoose.model("Projects", projectSchema);