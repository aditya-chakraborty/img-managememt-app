import {useDispatch, useSelector} from "react-redux";
import {galleryActions} from "../../store/images-slice";
import classes from "./ActionBar.module.css";

function ActionBar() {

	const dispatch = useDispatch();
	const isSelected = useSelector(state => state.gallery.isSelected)

	const searchChangeHandler = (event) => {
		event.preventDefault();
		const searchValue = event.target.value;
		dispatch(galleryActions.updateSearchTerm(searchValue));
	};

	const selectAllChangeHandler = (event) => {
		dispatch(galleryActions.updateSelectAll());
	};

	const deleteClickHandler = (event) => {
		event.preventDefault();
		dispatch(galleryActions.removeImgFromGallery());
	};

	const titleSortHandler = (event) => {
		event.preventDefault();
		dispatch(galleryActions.sortByTitle());
	};

	const dateSorthandler = (event) => {
		event.preventDefault();
		dispatch(galleryActions.sortByDate());
	};

	const sizeSortHandler = (event) => {
		event.preventDefault();
		dispatch(galleryActions.sortBySize());
	};

	return (
		<div className={classes.container}>
			<div className={classes.search}>
				<div className={classes.selectCheck}>
					<label>
						<input type="checkbox" className={classes.checkbox} onChange={selectAllChangeHandler}/>
						Select All
					</label>
				</div>
				<div className={classes.searchBarContainer}>
					<a>
						{isSelected && <i onClick={deleteClickHandler}
										  className="fa fa-trash-o"
										  style={{fontSize: "20px", marginTop: "5px"}}
						/>}
					</a>
					<div className={classes.searchbar}>
						<i
							className="fa fa-search"
							style={{
								fontSize: "16px",
								marginRight: "10px",
								marginLeft: "10px",
							}}/>
						<input
							type="text"
							id="header-search"
							placeholder="Search Media"
							className={classes.bar}
							onChange={searchChangeHandler}
						/>
					</div>
				</div>
			</div>
			<div className={classes.sorter}>
				<div className={classes.sortBy}>Sort By</div>
				<div className={classes.sortControl}>
					<button className={classes.sortButton} onClick={titleSortHandler}>Title</button>
					<button className={classes.sortButton} onClick={dateSorthandler}>Date</button>
					<button className={classes.sortButton} onClick={sizeSortHandler}>Size</button>
				</div>
			</div>
		</div>
	);
}

export default ActionBar;
