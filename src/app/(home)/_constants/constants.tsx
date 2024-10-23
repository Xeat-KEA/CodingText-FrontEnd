import {
  BannerBubble1,
  BannerBubble2,
  BannerBubble3,
} from "../_components/Icons";

export const BANNER_CARD_LIST = [
  {
    content: "문제를 풀며 궁금한 점을\nChatGPT에게 물어보세요!",
    bubble: <BannerBubble1 />,
  },
  {
    content: "ChatGPT가 질문에\n친절하게 답해줄거에요!",
    bubble: <BannerBubble2 />,
  },
  {
    content: "새로 배운 내용을 정리해\n블로그를 작성해보세요!",
    bubble: <BannerBubble3 />,
  },
];

export const BOARD_TAB_LIST = ["전체", "코딩테스트", "일반"];
