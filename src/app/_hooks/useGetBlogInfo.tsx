// import { useParams } from "next/navigation";
// import { useBlogStore } from "../stores";
// import { Post_Dummy_Data } from "../(admin)/_constants/constants";

// export const useGetBlogInfo = () => {
//   const params = useParams();

//   const blogId = useBlogStore((state) => state.blogId);
//   const categoryId = useBlogStore((state) => state.categoryId);
//   const childCategoryId = useBlogStore((state) => state.childCategoryId);

//   const setBlogId = useBlogStore((state) => state.setBlogId);
//   const setCategoryId = useBlogStore((state) => state.setCategoryId);
//   const setChildCategoryId = useBlogStore((state) => state.setChildCategoryId);

//   if (params.id) {
//     const newBlogId = Number(params.id);
//     if (newBlogId !== blogId) {
//       setBlogId(newBlogId);
//     }
//   } else {
//     const findedPost = Post_Dummy_Data.find(
//       (post) => post.postId === Number(params?.postId)
//     );
//     if (findedPost) {
//       const newBlogId = Number(findedPost?.blogId);
//       const newCategoryId = Number(findedPost?.categoryId);
//       const newChildCategoryId = Number(findedPost?.childCategoryId);

//       if (newBlogId !== blogId) {
//         setBlogId(newBlogId);
//       }
//       if (newCategoryId !== categoryId) {
//         setCategoryId(newCategoryId);
//       }
//       if (newChildCategoryId !== childCategoryId) {
//         setChildCategoryId(newChildCategoryId);
//       }
//     } else {
//     }
//   }
// };
