"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type Props = {
  post_title: string;
  post_slug: string;
  post_author: string;
};

export function PostViewTracker({ post_title, post_slug, post_author }: Props) {
  useEffect(() => {
    posthog.capture("post_viewed", { post_title, post_slug, post_author });
  }, [post_slug, post_title, post_author]);

  return null;
}
