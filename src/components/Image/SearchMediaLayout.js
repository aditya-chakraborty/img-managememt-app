import Image, {ImageLarge} from './Image';
import PropTypes from 'prop-types'
import classes from './SearchMediaLayout.module.css';
import {useEffect, useState} from "react";
import Card from "../UI/Card";
import {galleryActions} from "../../store/images-slice";
import {useDispatch} from "react-redux";

const SearchMediaLayout = ({searchTerm}) => {
    const dispatch = useDispatch();
    const [loadedImages, setLoadedImages] = useState([])
    const [selectedImage, setSelectedImage] = useState('')
    const fetchImages = () => {
        (async () => {
            const urlBuilder = `https://api.unsplash.com/search/photos?client_id=9bLVQjzOfkMuzMp-JwxpwjaIPwmU0qXWyrvIo0ATTzg&per_page=20&query=${searchTerm}`
            const response = await fetch(urlBuilder);
            const responseJson = await response.json();
            const responseData = responseJson.results;
            setLoadedImages(responseData.map(({id, urls: {thumb, regular}, description, height, width, created_at}) => {
                return {
                    id: id,
                    url: thumb,
                    url_regular: regular,
                    name: `img${id}`,
                    description: description,
                    height: height,
                    width: width,
                    date: created_at,
                    isChecked: false
                }
            }))
        })().catch(err => {
            // Send error log to metric service, Sentry etc
            console.error(err);
        });
    }


    useEffect(() => {
        setSelectedImage('')
        if (searchTerm) {
            fetchImages()
        }
    }, [searchTerm])

    return (
        <section className={classes.media}>
            <div className={classes.row}>
                {selectedImage &&
                <ImageLarge showSelectButton={false} isChecked={false} name={selectedImage.name} id={selectedImage.id} url={selectedImage.url_regular} description={selectedImage.description} />
                }
                {!selectedImage && (searchTerm ? loadedImages.length === 0
                        ? (<h4>Uh-oh! Nothing to show.</h4>)
                        : loadedImages.map(img => (
                            <Card key={img.id}>
                                <Image
                                    showSelectButton={false}
                                    id={img.id}
                                    name={img.name}
                                    description={img.description}
                                    height={img.height}
                                    width={img.width}
                                    url={img.url}
                                    isChecked={img.isChecked}
                                    onClick={() => {
                                        dispatch(galleryActions.addImgToGallery(img))
                                        setSelectedImage(img)
                                    }}
                                />
                            </Card>))
                    : (<h4>Make a search to get started!</h4>))
                }
            </div>
        </section>
    )
}

SearchMediaLayout.propTypes = {
    searchTerm: PropTypes.string.isRequired,
}

export default SearchMediaLayout;


/*
*
* {
	"0": {
		"id": "QBpZGqEMsKg",
		"created_at": "2017-09-02T16:32:42-04:00",
		"updated_at": "2021-11-30T20:02:59-05:00",
		"promoted_at": "2017-09-03T18:38:57-04:00",
		"width": 5472,
		"height": 3648,
		"color": "#262626",
		"blur_hash": "L8AJ=,tQIpV@WVxtE1Rj00RjWBxu",
		"description": "Programming ",
		"alt_description": "people doing office works",
		"urls": {
			"raw": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA&ixlib=rb-1.2.1",
			"full": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=srgb&fm=jpg&ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA&ixlib=rb-1.2.1&q=85",
			"regular": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA&ixlib=rb-1.2.1&q=80&w=1080",
			"small": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA&ixlib=rb-1.2.1&q=80&w=400",
			"thumb": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA&ixlib=rb-1.2.1&q=80&w=200"
		},
		"links": {
			"self": "https://api.unsplash.com/photos/QBpZGqEMsKg",
			"html": "https://unsplash.com/photos/QBpZGqEMsKg",
			"download": "https://unsplash.com/photos/QBpZGqEMsKg/download?ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA",
			"download_location": "https://api.unsplash.com/photos/QBpZGqEMsKg/download?ixid=MnwyNzg2NjB8MHwxfHNlYXJjaHwyMXx8b2ZmaWNlfGVufDB8fHx8MTYzODM1NDcxNA"
		},
		"categories": [],
		"likes": 1702,
		"liked_by_user": false,
		"current_user_collections": [],
		"sponsorship": null,
		"topic_submissions": {
			"business-work": {
				"status": "approved",
				"approved_on": "2020-04-06T10:20:15-04:00"
			},
			"work": {
				"status": "approved",
				"approved_on": "2021-08-02T13:41:03-04:00"
			}
		},
		"user": {
			"id": "yCKqpiyeloQ",
			"updated_at": "2021-12-01T01:58:28-05:00",
			"username": "frantic",
			"name": "Alex Kotliarskyi",
			"first_name": "Alex",
			"last_name": "Kotliarskyi",
			"twitter_username": "alex_frantic",
			"portfolio_url": "http://frantic.im",
			"bio": "Camera lens opens a whole new dimension",
			"location": null,
			"links": {
				"self": "https://api.unsplash.com/users/frantic",
				"html": "https://unsplash.com/@frantic",
				"photos": "https://api.unsplash.com/users/frantic/photos",
				"likes": "https://api.unsplash.com/users/frantic/likes",
				"portfolio": "https://api.unsplash.com/users/frantic/portfolio",
				"following": "https://api.unsplash.com/users/frantic/following",
				"followers": "https://api.unsplash.com/users/frantic/followers"
			},
			"profile_image": {
				"small": "https://images.unsplash.com/profile-fb-1503816033-0d95a87708ea.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32",
				"medium": "https://images.unsplash.com/profile-fb-1503816033-0d95a87708ea.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=64&w=64",
				"large": "https://images.unsplash.com/profile-fb-1503816033-0d95a87708ea.jpg?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=128&w=128"
			},
			"instagram_username": "alex_frantic",
			"total_collections": 0,
			"total_likes": 0,
			"total_photos": 13,
			"accepted_tos": true,
			"for_hire": false,
			"social": {
				"instagram_username": "alex_frantic",
				"portfolio_url": "http://frantic.im",
				"twitter_username": "alex_frantic",
				"paypal_email": null
			}
		},
		"tags": [
			{
				"type": "search",
				"title": "office"
			},
			{
				"type": "search",
				"title": "worker"
			},
			{
				"type": "search",
				"title": "work"
			}
		]
	}
}
* */