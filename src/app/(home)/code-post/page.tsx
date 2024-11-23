"use client";

import PostCard from "@/app/_components/PostCard";

export default function CodePostPage() {
  const dummy = [
    {
      articleId: 1,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 2,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 3,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 1,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 2,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 3,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 1,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 2,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 3,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 1,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 2,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 3,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 1,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 2,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
    {
      articleId: 3,
      profileImg: "/profileImg1.png",
      nickName: "사용자1",
      category: "자유",
      createAt: "2024-11-22",
      title: "제목입니다",
      content: "7JWI64WV7ZWY7IS47JqUIOuCtOyaqeyeheuLiOuLpA==",
      thumbnail: null,
      likes: 123,
      comments: 123,
      views: 123,
      codeId: 123,
    },
  ];
  return (
    <div className="top-container">
      <div className="max-w-1000 pt-16">
        <div className="flex flex-col py-8 gap-4">
          {/* 게시글 목록 제목 / 설명 */}
          <div className="main-text-container">
            <div className="main-title-container">
              <span className="main-title">최신 게시글</span>
            </div>
            <span className="main-sub-title">
              요즘 개발자의 관심사를 알아보세요
            </span>
          </div>
          <div className="flex flex-col divide-y divide-border-2">
            {dummy.map((el, index) => (
              <PostCard
                articleId={el.articleId}
                comments={el.comments}
                content={el.content}
                createAt={el.createAt}
                likes={el.likes}
                title={el.title}
                views={el.views}
                codeId={el.codeId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
