import { useState } from 'react';
import Media from "../UI/Media";
import Modal from "../UI/Modal";
import Image from "./Image";
import classes from './AddImageWindow.module.css';
import SearchMediaLayout from './SearchMediaLayout';

const AddImageWindow = (props) => {
	const [searchTerm, setSearchTerm] = useState('')
    const searchClickHandler = (event) => {
        event.preventDefault();
    };

    return (
        <Modal onClose={props.onClose}>

            <h3>Select Image</h3>
            <p>Search and select an image</p>
            <div className={classes.searchBarContainer}>
				<div className={classes.searchbar}>
					<i
					className="fa fa-search"
					style={{
						fontSize: "16px",
						marginRight: "10px",
						marginLeft: "10px",
                        color: "lightgray"
					}}/>
					<input
						onChange={({_, target: {value}}) => setSearchTerm(value)}
						type="text"
						id="header-search"
						placeholder="Search Media"
						className={classes.bar}
					/>
				</div>
                <div>
                    <button className={classes.searchButton} onClick={searchClickHandler}>Search</button>
					<SearchMediaLayout searchTerm={searchTerm}/>
                </div>
			</div>
      </Modal>
    );
}

export default AddImageWindow;