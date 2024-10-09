"use client";

import { useState } from "react";
import { LogoIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { SbGotestIcon, SbHiddenIcon, SbHomeIcon, SbMyblogIcon, SbNewpostIcon } from "./Icons";
import { Board_Categories as initialCategories } from "../_constants/constants";
import Dialog from "@/app/_components/Dialog";

export default function SideBar() {
    const loggedInUserId = "USER"; // 실제 로그인된 유저 아이디
    const blogOwnerId = "USER"; // 현재 블로그 주인 아이디

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeCategories, setActiveCategories] = useState<number[]>([]); // 활성화
    const [boardCategories, setBoardCategories] = useState(initialCategories); // 카테고리 상태 관리
    const [newSubCategoryTitle, setNewSubCategoryTitle] = useState("");
    const [newCategoryTitle, setNewCategoryTitle] = useState("");
    const [isAddingSubCategory, setIsAddingSubCategory] = useState(false);
    const [isAddingCategory, setIsAddingCategory] = useState(false); // 상위 게시판 추가 상태 관리
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null); // 삭제할 카테고리 ID
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null); // 수정 중인 카테고리 ID
    const [editCategoryTitle, setEditCategoryTitle] = useState(""); // 수정할 카테고리 제목



    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    // 상위 게시판 클릭 -> 하위 게시판 토글
    const handleCategoryClick = (id: number) => {
        setActiveCategories(prev =>
            prev.includes(id) ? prev.filter(activeId => activeId !== id) : [...prev, id]
        );
    };

    // 하위 게시판 추가 함수
    const handleAddSubCategory = (categoryId: number) => {
        if (!newSubCategoryTitle.trim()) return;

        const updatedCategories = boardCategories.map(category => {
            if (category.id === categoryId) {
                return {
                    ...category,
                    subCategories: [
                        ...(category.subCategories || []),
                        { id: Date.now(), title: newSubCategoryTitle }
                    ]
                };
            }
            return category;
        });

        setBoardCategories(updatedCategories); // 상태 업데이트
        setNewSubCategoryTitle("");
        setIsAddingSubCategory(false);
    };

    // 상위 게시판 추가 함수
    const handleAddCategory = () => {
        if (!newCategoryTitle.trim()) return;
        const updatedCategories = [
            ...boardCategories,
            {
                id: Date.now(),
                title: newCategoryTitle,
                subCategories: []
            }
        ];
        setBoardCategories(updatedCategories);
        setNewCategoryTitle("");
        setIsAddingCategory(false);
    };

    // 수정 및 삭제 버튼 표시 (hover 시)
    const handleMouseEnter = (id: number) => setHoveredCategoryId(id);
    const handleMouseLeave = () => setHoveredCategoryId(null);

    // 엔터키 적용
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === "Enter") {
            action();
        }
    };

    // 상위게시판 제목 수정 함수
    const handleEditCategory = (id: number, title: string) => {
        setEditCategoryId(id);
        setEditCategoryTitle(title);
    };

    // 상위게시판 수정된 제목 저장 함수
    const saveEditCategory = (id: number) => {
        const updatedCategories = boardCategories.map(category => {
            if (category.id === id) {
                return { ...category, title: editCategoryTitle };
            }
            return category;
        });
        setBoardCategories(updatedCategories);
        setEditCategoryId(null);
        setEditCategoryTitle("");
    };

    const cancelEditCategory = () => {
        setEditCategoryId(null);
        setEditCategoryTitle("");
    };

    // 상위게시판 삭제 함수
    const handleDeleteCategory = (id: number) => {
        console.log(id, "게시판 삭제 요청")
        setCategoryToDelete(id);
        setIsDialogOpen(true);
    }

    // 상위게시판 삭제 확인 함수
    const confirmDeleteCategory = () => {
        if (categoryToDelete === null) return;
        const updatedCategories = boardCategories.filter(category => category.id !== categoryToDelete);
        setBoardCategories(updatedCategories);
        setIsDialogOpen(false);
        setCategoryToDelete(null); // 삭제한 카테고리 ID 초기화
    }

    // 다이얼로그 취소
    const cancelDeleteCategory = () => {
        setIsDialogOpen(false);
        setCategoryToDelete(null); // 삭제할 카테고리 ID 초기화
    }

    // 사이드바 페이지 이동 컴포넌트
    const SidebarLink = ({ href, label, Icon }: { href: string; label: string; Icon: React.FC }) => (
        <Link href={href} className={`flex items-center h-6 py-6 text-black ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-60 pl-6 pr-2"}`}>
            {!isCollapsed && <p className="text-xs">{label}</p>}
            <Icon />
        </Link>
    );

    return (
        <nav className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-150 ${isCollapsed ? "w-10" : "w-60"}`}>
            {/* 사이드바 상단 요소 */}
            <div className={`flex items-center h-8 mt-5 mb-3 mr-2 ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-52 ml-6"}`}>
                {!isCollapsed && <LogoIcon />}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <SbHiddenIcon />
                </button>
            </div>

            {/* 사이드바 링크 */}
            <SidebarLink href="/" label={`${blogOwnerId}의 블로그 홈`} Icon={SbHomeIcon} />

            {/* 게시판 목록 */}
            {!isCollapsed && (
                <div className="w-60 mt-6">
                    <p className="text-disabled text-xs font-regular h-10 pl-6 py-2">게시판 목록</p>
                    {boardCategories.map(category => (
                        <div
                            key={category.id}
                            onMouseEnter={() => handleMouseEnter(category.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="relative text-black text-sm font-regular h-10 pl-6 py-2 flex items-center">
                                {editCategoryId === category.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editCategoryTitle}
                                            onChange={(e) => setEditCategoryTitle(e.target.value)}
                                            onKeyPress={(e) => handleKeyPress(e, () => saveEditCategory(category.id))}
                                            className="bg-bg-1 text-body text-sm font-regular w-auto p-1 "
                                            placeholder="카테고리 제목 수정"
                                        />
                                        <div className="absolute right-3 flex text-2xs space-x-2">
                                            <button className="text-primary" onClick={() => saveEditCategory(category.id)}>수정</button>
                                            <button className="text-disabled" onClick={cancelEditCategory}>취소</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p onClick={() => handleCategoryClick(category.id)}>{category.title}</p>
                                        {category.id !== 1 && category.id !== 2 && hoveredCategoryId === category.id && (
                                            <div className="absolute right-3 flex text-2xs space-x-2">
                                                <button className="text-primary" onClick={() => handleEditCategory(category.id, category.title)}>수정</button>
                                                <button className="text-red" onClick={() => handleDeleteCategory(category.id)}>삭제</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>



                            {/* 하위 게시판 목록 */}
                            {activeCategories.includes(category.id) && category.subCategories && (
                                <div className="pl-10">
                                    {category.subCategories.map(subCategory => (
                                        <p key={subCategory.id} className="text-xs font-regular py-2">{subCategory.title}</p>
                                    ))}
                                    {category.id !== 1 && category.id !== 2 && (
                                        <>
                                            {isAddingSubCategory ? (
                                                <div className="flex items-center w-60">
                                                    <input
                                                        type="text"
                                                        value={newSubCategoryTitle}
                                                        onChange={(e) => setNewSubCategoryTitle(e.target.value)}
                                                        className="bg-bg-1 text-2xs p-1"
                                                        onKeyPress={(e) => handleKeyPress(e, () => handleAddSubCategory(category.id))}
                                                        placeholder="새 하위 게시판 제목"
                                                    />
                                                    <div className="absolute right-3 flex text-2xs space-x-2">
                                                        <button className="text-primary" onClick={() => handleAddSubCategory(category.id)}>추가</button>
                                                        <button className="text-disabled" onClick={() => setIsAddingSubCategory(false)}>취소</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setIsAddingSubCategory(!isAddingSubCategory)}
                                                    className="text-2xs text-disabled py-3"
                                                >
                                                    새 하위 게시판 추가
                                                </button>
                                            )
                                            }
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 새 상위 게시판 추가 */}
                    <div className="pl-6 py-3">
                        {isAddingCategory ? (
                            <div className="flex space-x-2 items-center">
                                <input
                                    type="text"
                                    value={newCategoryTitle}
                                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                                    className="bg-bg-1 text-body text-sm font-regular p-1 "
                                    onKeyPress={(e) => handleKeyPress(e, handleAddCategory)}
                                    placeholder="새 상위 게시판 제목"
                                />
                                <div className="absolute right-3 flex text-2xs space-x-2">
                                    <button className="text-primary" onClick={handleAddCategory}>추가</button>
                                    <button className="text-disabled" onClick={() => setIsAddingCategory(false)}>취소</button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAddingCategory(true)}
                                className="text-xs text-disabled font-semibold"
                            >
                                새 상위 게시판 추가
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* 하단 요소 */}
            <div className="absolute bottom-2">
                <SidebarLink href="/" label="문제 풀러 가기" Icon={SbGotestIcon} />
                {loggedInUserId === blogOwnerId ? (
                    <SidebarLink href="/" label="새 게시글" Icon={SbNewpostIcon} />
                ) : (
                    <SidebarLink href="/" label="내 블로그로" Icon={SbMyblogIcon} />
                )}
            </div>

            {/* 다이얼로그 컴포넌트 */}
            {isDialogOpen && (
                <Dialog
                    title="게시판을 삭제할까요?"
                    content="하위 게시판도 함께 사라지며 삭제 후 복구할 수 없어요!"
                    isWarning={true}
                    backBtn="취소"
                    onBackBtnClick={cancelDeleteCategory}
                    redBtn="삭제"
                    onBtnClick={confirmDeleteCategory}
                />
            )}

        </nav>
    );
}