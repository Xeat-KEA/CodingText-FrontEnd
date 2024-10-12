import { useState } from "react";
import { useOutsideClick } from "../_hooks/useOutsideClick";
import { IReportDialog } from "../_interfaces/interfaces";

export default function ReportDialog({
    icon,
    title,
    content,
    isWarning,
    dropDown,
    backBtn,
    onBackBtnClick,
    subBtn,
    onSubBtnClick,
    primaryBtn,
    redBtn,
    onBtnClick,
}: IReportDialog) {
    const ref = useOutsideClick(onBackBtnClick);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>(""); // 신고 내용 값

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndex(event.target.selectedIndex);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="overlay">
            <div
                ref={ref}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-1"
            >
                <div className="flex flex-col items-center gap-4 py-6">
                    {icon && icon}
                    <div className="flex flex-col gap-2 text-center">
                        <span className="whitespace-pre-wrap text-black text-xl font-semibold">
                            {title}
                        </span>
                        <span
                            className={`whitespace-pre-wrap ${isWarning ? "font-bold text-red" : "text-body"
                                }`}
                        >
                            {content}
                        </span>
                    </div>
                </div>
                {/* 드롭다운 */}
                <div className="flex flex-col gap-2 relative items-center w-full">
                    {dropDown && (
                        <select
                            className={`w-full border p-2 rounded-md text-sm font-regular text-center ${selectedIndex === null ? 'text-disabled' : 'text-black'}`}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled selected hidden>
                                분류
                            </option>
                            {dropDown.map((item, index) => (
                                <option key={index} value={item} className="text-black text-sm font-regular">
                                    {item}
                                </option>
                            ))}
                        </select>
                    )}
                    {/* 직접 입력 선택 시 */}
                    {selectedIndex === 5 && (
                        <textarea
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="신고 사유를 적어주세요"
                            className="w-full h-28 border pl-4 p-2 rounded-md text-base font-regular"
                        />
                    )}
                </div>
                <div className="flex gap-4">
                    {/* 뒤로가기 버튼 */}
                    <button onClick={onBackBtnClick} className="btn-default w-full">
                        {backBtn}
                    </button>
                    {/* 중간 버튼 (코딩 테스트 정답) */}
                    {subBtn && (
                        <button onClick={onSubBtnClick} className="btn-default w-full">
                            {subBtn}
                        </button>
                    )}
                    {/* Primary 색상 버튼 */}
                    {primaryBtn && (
                        <button onClick={onBtnClick} className="btn-primary w-full">
                            {primaryBtn}
                        </button>
                    )}
                    {/* Red 색상 버튼 */}
                    {redBtn && (
                        <button onClick={onBtnClick} className="btn-red w-full">
                            {redBtn}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}