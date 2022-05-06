import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ comments }) => {
  const renderedComments = Object.values(comments).map((comment) => {
    if (comment.status === "rejected") {
      comment.content = "this comment was rejected";
    } else if (comment.status === "pending") {
      comment.content = "this comment is waiting for moderation";
    }
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul> {renderedComments}</ul>;
};
