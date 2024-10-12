// 추후 컴포넌트 분리 필요

"use client";

import { useState } from "react";
import { LogoIcon } from "@/app/_components/Icons";
import Link from "next/link";
import { SbGotestIcon, SbHiddenIcon, SbHomeIcon, SbMyblogIcon, SbNewpostIcon } from "./Icons";
import { loggedInUserId, blogOwnerId, Board_Categories as initialCategories } from "../_constants/constants";
import Dialog from "@/app/_components/Dialog";

export default function SideBar() {
    const [isCollapsed, setIsCollapsed] = useState(false); // 최소화
    const [activeCategories, setActiveCategories] = useState<number[]>([]); // 활성화
    const [boardCategories, setBoardCategories] = useState(initialCategories);
    const [newSubCategoryTitle, setNewSubCategoryTitle] = useState("");
    const [newCategoryTitle, setNewCategoryTitle] = useState("");
    const [isAddingSubCategory, setIsAddingSubCategory] = useState<{ [key: number]: boolean }>({});
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [hoveredCategoryId, setHoveredCategoryId] = useState<number | null>(null);
    const [hoveredSubCategoryId, setHoveredSubCategoryId] = useState<number | null>(null); // 하위
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<{ categoryId: number, subCategoryId: number, isSub: boolean } | null>(null); // 하위
    const [deletCategoryTitle, setDeleteCategoryTitle] = useState("");
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editSubCategory, setEditSubCategory] = useState<{ [categoryId: number]: number | null }>({});
    const [editCategoryTitle, setEditCategoryTitle] = useState("");
    const [editSubCategoryTitle, setEditSubCategoryTitle] = useState<string>("");

    const toggleSidebar = () => setIsCollapsed(!isCollapsed);

    // 사이드바 페이지 이동 컴포넌트
    const SidebarLink = ({ href, label, Icon }: { href: string; label: string; Icon: React.FC }) => (
        <Link href={href} className={`flex items-center h-6 py-6 text-black ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-60 pl-6 pr-2"}`}>
            {!isCollapsed && <p className="text-xs">{label}</p>}
            <Icon />
        </Link>
    );

    // 상위 게시판 클릭 -> 하위 게시판 토글
    const handleCategoryClick = (id: number) => {
        setActiveCategories(prev =>
            prev.includes(id) ? prev.filter(activeId => activeId !== id) : [...prev, id]
        );
    };

    // 엔터키 적용 (수정 필요)
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === "Enter") {
            action();
        }
    };

    const handleAddSubCategoryClick = (categoryId: number) => {
        setIsAddingSubCategory(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    // 상하위 게시판 추가 함수
    const handleAddCategory = (title: string, parentId?: number) => {
        if (!title.trim()) return;

        const updatedCategories = parentId
            ? boardCategories.map(category => {
                if (category.id === parentId) {
                    return { ...category, subCategories: [...(category.subCategories || []), { id: Date.now(), title }] };
                } return category;
            }) : [
                ...boardCategories, { id: boardCategories.length + 1, title, subCategories: [] }
            ];
        setBoardCategories(updatedCategories);

        if (parentId) {
            setNewSubCategoryTitle("");
            setIsAddingSubCategory(prevState => ({ ...prevState, [parentId]: false })); // 하위 카테고리 추가 후 초기화
        } else {
            setNewCategoryTitle("");
            setIsAddingCategory(false); // 상위 카테고리 추가 후 초기화
        }
    };

    // 카테고리 hover 처리
    const handleHover = (id: number | null, isSubCategory: boolean = false) => {
        if (isSubCategory) setHoveredSubCategoryId(id);
        else setHoveredCategoryId(id);
    };
    // 상위 카테고리 hover 처리
    const handleMouseEnter = (id: number) => handleHover(id);
    const handleMouseLeave = () => handleHover(null);

    // 하위 게시판 Hover 처리
    const handleSubCategoryMouseEnter = (id: number) => {
        handleHover(id, true);
    };
    const handleSubCategoryMouseLeave = () => handleHover(null, true);

    // 상위게시판 수정
    const handleEditCategory = (id: number, title: string) => {
        setEditCategoryId(id);
        setEditCategoryTitle(title);
    };
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

    // 하위 게시판 수정
    const handleEditSubCategory = (categoryId: number, subCategoryId: number, title: string) => {
        setEditSubCategory(prevState => ({
            ...prevState,
            [categoryId]: subCategoryId, // 특정 상위 카테고리의 하위 게시판을 수정 상태로 설정
        }));
        setEditSubCategoryTitle(title);
    };
    const saveEditSubCategory = (categoryId: number, subCategoryId: number) => {
        const updatedCategories = boardCategories.map(category => {
            if (category.id === categoryId) {
                const updatedSubCategories = category.subCategories?.map(subCategory => {
                    if (subCategory.id === subCategoryId) {
                        return { ...subCategory, title: editSubCategoryTitle };
                    }
                    return subCategory;
                });
                return { ...category, subCategories: updatedSubCategories };
            }
            return category;
        });

        setBoardCategories(updatedCategories);
        setEditSubCategory(prevState => ({ ...prevState, [categoryId]: null })); // 수정 상태 해제
        setEditSubCategoryTitle("");
    };
    const cancelEditSubCategory = (categoryId: number) => {
        setEditSubCategory(prevState => ({ ...prevState, [categoryId]: null })); // 수정 상태 해제
        setEditSubCategoryTitle("");
    };

    // 상위게시판 삭제 함수
    const handleDeleteCategory = (categoryId: number, title: string) => {
        setCategoryToDelete({ categoryId, subCategoryId: 0, isSub: false });
        setDeleteCategoryTitle(title);
        setIsDialogOpen(true);
    }
    // 상위게시판 삭제 확인 함수
    const confirmDeleteCategory = () => {
        if (categoryToDelete === null) return;
        const { categoryId } = categoryToDelete; // id 추출
        const updatedCategories = boardCategories.filter(category => category.id !== categoryId);
        setBoardCategories(updatedCategories);
        setIsDialogOpen(false);
        setCategoryToDelete(null); // 삭제한 카테고리 ID 초기화
    }
    // 다이얼로그 취소
    const cancelDeleteCategory = () => {
        setIsDialogOpen(false);
        setCategoryToDelete(null); // 삭제할 카테고리 ID 초기화
    }

    // 하위게시판 삭제 함수
    const handleDeleteSubCategory = (categoryId: number, subCategoryId: number, title: string) => {
        setCategoryToDelete({ categoryId, subCategoryId, isSub: true }); // 삭제할 하위 카테고리 정보 설정
        setDeleteCategoryTitle(title);
        setIsDialogOpen(true); // 다이얼로그 열기
    };

    // 하위게시판 삭제 확인 함수
    const confirmDeleteSubCategory = () => {
        if (!categoryToDelete) return;

        const { categoryId, subCategoryId } = categoryToDelete;
        const updatedCategories = boardCategories.map(category => {
            if (category.id === categoryId) {
                const filteredSubCategories = category.subCategories?.filter(sub => sub.id !== subCategoryId);
                return { ...category, subCategories: filteredSubCategories };
            }
            return category;
        });

        setBoardCategories(updatedCategories);
        setIsDialogOpen(false);
        setCategoryToDelete(null); // 삭제한 하위 카테고리 정보 초기화
    };


    return (
        <nav className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-150 z-20 ${isCollapsed ? "w-10" : "w-60"}`}>
            {/* 사이드바 상단 요소 */}
            <div className={`flex items-center h-8 mt-5 mb-3 mr-2 ${isCollapsed ? "justify-center w-6 ml-2" : "justify-between w-52 ml-6"}`}>
                {!isCollapsed && <LogoIcon />}
                <button onClick={toggleSidebar} className="focus:outline-none">
                    <SbHiddenIcon />
                </button>
            </div>

            {/* 사이드바 링크 */}
            <SidebarLink
                href="/"
                label={loggedInUserId === blogOwnerId ? "나의 블로그 홈" : `${blogOwnerId}의 블로그 홈`}
                Icon={SbHomeIcon}
            />
            {/* 게시판 목록 */}
            {!isCollapsed && (
                <div className="w-60 mt-6">
                    <p className="text-disabled text-xs font-regular h-10 pl-6 py-2">게시판 목록</p>
                    {boardCategories.map(category => (
                        <div className="board">
                            <div className="flex items-center relative text-black text-sm font-regular h-10 pl-6 py-2"
                                                        key={category.id}
                                                        onMouseEnter={() => handleMouseEnter(category.id)}
                                                        onMouseLeave={handleMouseLeave}>
                                {editCategoryId === category.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editCategoryTitle}
                                            onChange={(e) => setEditCategoryTitle(e.target.value)}
                                            onKeyPress={(e) => handleKeyPress(e, () => saveEditCategory(category.id))}
                                            className="bg-bg-1 text-body text-sm font-regular p-1 w-32"
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
                                        {category.id !== 0 && category.id !== 1 && hoveredCategoryId === category.id && (
                                            <div className="absolute right-3 flex text-2xs space-x-2">
                                                <button className="text-primary" onClick={() => handleEditCategory(category.id, category.title)}>수정</button>
                                                <button className="text-red" onClick={() => handleDeleteCategory(category.id, category.title)}>삭제</button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                            
                            {/* 하위 게시판 목록 */}
                            {activeCategories.includes(category.id) && category.subCategories && (
                                <div className="pl-10">
                                    {category.subCategories.map(subCategory => (
                                        <div
                                            key={subCategory.id}
                                            onMouseEnter={() => handleSubCategoryMouseEnter(subCategory.id)}
                                            onMouseLeave={handleSubCategoryMouseLeave}
                                            className="flex text-xs font-regular h-8 py-2 "
                                        >
                                            {editSubCategory[category.id] === subCategory.id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editSubCategoryTitle}
                                                        onChange={(e) => setEditSubCategoryTitle(e.target.value)}
                                                        onKeyPress={(e) => handleKeyPress(e, () => saveEditSubCategory(category.id, subCategory.id))}
                                                        className="bg-bg-1 text-xs font-regular pl-1 py-1 w-32"
                                                        placeholder="하위 게시판 제목 수정"
                                                    />
                                                    <div className="absolute right-3 flex text-2xs space-x-2">
                                                        <button className="text-primary" onClick={() => saveEditSubCategory(category.id, subCategory.id)}>저장</button>
                                                        <button className="text-disabled" onClick={() => cancelEditSubCategory(category.id)}>취소</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <p>{subCategory.title}</p>

                                                    {category.id !== 0 && category.id !== 1 && subCategory.id !== 0 && hoveredSubCategoryId === subCategory.id && (
                                                        <div className="absolute right-3 flex text-2xs space-x-2">
                                                            <button
                                                                className="text-primary"
                                                                onClick={() => handleEditSubCategory(category.id, subCategory.id, subCategory.title)}>
                                                                수정
                                                            </button>
                                                            <button
                                                                className="text-red"
                                                                onClick={() => handleDeleteSubCategory(category.id, subCategory.id, subCategory.title)}>
                                                                삭제
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    ))}
                                    {category.id !== 0 && category.id !== 1 && (
                                        <>
                                            {isAddingSubCategory[category.id] ? (
                                                <div className="flex items-center">
                                                    <input
                                                        type="text"
                                                        value={newSubCategoryTitle}
                                                        onChange={(e) => setNewSubCategoryTitle(e.target.value)}
                                                        className="bg-bg-1 text-xs font-regular h-8 pl-1 py-2"
                                                        onKeyPress={(e) => handleKeyPress(e, () => handleAddCategory(newSubCategoryTitle, category.id))}
                                                        placeholder="새 하위 게시판 제목"
                                                    />
                                                    <div className="absolute right-3 flex text-2xs space-x-2">
                                                        <button className="text-primary" onClick={() => handleAddCategory(newSubCategoryTitle, category.id)}>추가</button>
                                                        <button className="text-disabled" onClick={() => setIsAddingSubCategory(prevState => ({ ...prevState, [category.id]: false }))}>취소</button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddSubCategoryClick(category.id)}
                                                    className="text-2xs text-disabled h-8 py-2"
                                                >
                                                    새 하위 게시판 추가
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* 새 상위 게시판 추가 */}
                    <div className="flex items-center h-10 pl-6 py-3 ">
                        {isAddingCategory ? (
                            <div className="flex items-center h-10">
                                <input
                                    type="text"
                                    value={newCategoryTitle}
                                    onChange={(e) => setNewCategoryTitle(e.target.value)}
                                    className="bg-bg-1 text-body text-sm font-regular p-1 h-7 w-32"
                                    onKeyPress={(e) => handleKeyPress(e, () => handleAddCategory(newCategoryTitle))}
                                    placeholder="새 상위 게시판 제목"
                                />
                                <div className="absolute right-3 flex text-2xs space-x-2">
                                    <button className="text-primary" onClick={() => handleAddCategory(newCategoryTitle)}>추가</button>
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
                    title={`'${deletCategoryTitle}' \n 게시판을 삭제할까요?`}
                    content={
                        categoryToDelete?.isSub
                            ? "삭제 후 복구할 수 없어요!" // 하위
                            : "하위 게시판도 함께 사라지며 \n 삭제 후 복구할 수 없어요!" // 상위
                    }
                    isWarning={true}
                    backBtn="취소"
                    onBackBtnClick={cancelDeleteCategory}
                    redBtn="삭제"
                    onBtnClick={
                        categoryToDelete?.isSub
                        ? confirmDeleteSubCategory
                        : confirmDeleteCategory
                    }
                />
            )}
        </nav>
    );
}
