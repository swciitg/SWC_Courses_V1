const submitHandler = (e) => {
  e.preventDefault();
  ///////// @start
  ///////// THIS IS AN API CALL TO THE "/api/courses/:id/video/:video_id/bookmark" ROUTE
  const apiCall = () => {
    axios({
      method: "post",
      url: `/api/courses/${details.id}/video/${details.videos[curId]}/bookmark/`,
      data: {
        // time: timestamp,
        time: tStamp,
        text: text,
      },
      withCredentials: true,
    })
      .then((res) => {
        // console.log("Bookmark created successfully", res.data);
        setBookmarks([...bookmarks, res.data.bookmark]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  apiCall();
  ////////// @end

  // setText("");
  // setTimeStamp(0);
};

const deleteHandler = (id) => {
  ///////// @start
  ///////// THIS IS AN API CALL TO THE "/api/courses/:id/video/:video_id/bookmark/:book_id" ROUTE
  const apiCall = () => {
    axios({
      method: "delete",
      url: `/api/courses/${details.id}/video/${details.videos[curId]}/bookmark/${id}/`,
      withCredentials: true,
    })
      .then((res) => {
        console.log("Bookmark deleted successfully", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  apiCall();
