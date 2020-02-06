import React from "react";
import CollectionPresenter from "./CollectionPresenter";
import { moviesApi } from "../../api";

export default class extends React.Component {
  state = {
    collection: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const { data: collection } = await moviesApi.collection(id);
      this.setState({ collection });
    } catch {
      this.setState({ error: "Can't find collection information." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { error, loading, collection } = this.state;
    return (
      <CollectionPresenter
        error={error}
        loading={loading}
        collection={collection}
      />
    );
  }
}
