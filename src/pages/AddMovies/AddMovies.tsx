import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ContentService from "../../Services/ContentService";
import './AddMovies.css';

export default function AddMovies() {
    const closeAddMoviesPage = () => {
        ContentService.closeAddMoviesPopup(true);
    }
    const onSubmit = (event: any) => {
        event.preventDefault();
        let name = event.target.title.value;
        let comment = event.target.comment.value
        let url = event.target.image.value;
        ContentService.addMoviesToList({ name, url, comment });
    }
    return (
        <div className="modal-add">
            <div className="modal_content_add">
                <span className="closeIcon" onClick={() => closeAddMoviesPage()}>&times;</span>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <TextField id="title" label="Title" required variant="outlined" name="title" margin="normal" />
                    </div>
                    <div className="form-group">
                        <TextField id="comment" label="Comment" required variant="outlined" name="comment" margin="normal" />
                    </div>

                    <div className="form-group">
                        <TextField id="image" label="Image URL" required variant="outlined" name="image" margin="normal" />
                    </div>
                    <div className="form-group">
                        <Button type="submit" variant="contained">Add movies</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}