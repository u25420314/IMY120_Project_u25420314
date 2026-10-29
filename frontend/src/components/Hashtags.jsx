import { Link } from "react-router-dom"

function Hashtags({ tags}){
    if(!tags || tags.length === 0 ){
        return null
    }

    return (
        <div className="hashtags">
            {tags.map((tag) => {
                const clean = tag.replace(/^#/, "")
                return(
                    <Link key={clean} to={`/home?hashtag=${encodeURIComponent(clean)}`}>#{clean}</Link>
                )
            })}
        </div>
    )
}

export default Hashtags