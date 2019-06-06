import React from "react";
import { connect } from "react-redux";
import { getData } from "../actions/actionCreators";

class Post extends React.Component {
    componentDidMount() {
        // calling the new action creator
        this.props.getData();
    }
    render() {
        return (
        <ul className="list-group list-group-flush">
            {this.props.articles.map(el => (
            <li className="list-group-item" key={el.id}>
                {el.title}
            </li>
            ))}
        </ul>
        );
    }
}

const mapStateToProps= (state) => {
  return {
    articles: state.remoteArticles.slice(0, 10)
  };
}
const mapDispatchToProps = {
  getData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);