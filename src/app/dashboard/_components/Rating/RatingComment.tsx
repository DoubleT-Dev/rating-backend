import React from "react";
import Image from "next/image";
import { fetchRatingCommentCount, fetchRatingCommentPagination } from "@/routes/api";
import moment from "moment";
import Pagination from "@/components/ui/pagination";

const RatingComment = async ({
    biz,
    currentPage
}: {
    biz: any,
    currentPage: number
}) => {

    const data = await fetchRatingCommentPagination(biz.id, currentPage);
    const totalPages = await fetchRatingCommentCount(biz.id);

    return (
        <>
            {
                data.length > 0 ? data.map((comment: any, index : number) =>
                    <div key={`comment-${index}`} className="p-4 my-5 border rounded-xl">
                        <div className="flex items-start space-x-4">
                            <div className="">
                                <Image src="https://img.freepik.com/premium-vector/male-avatar-flat-icon-design-vector-illustration_549488-103.jpg" width={30} height={30} alt="User" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Anonymous</h3>
                                        <p className="text-sm text-muted-foreground">{moment(comment.created_at).format('MMMM D, YYYY')}</p>
                                    </div>
                                </div>

                                <p className="mt-4 text-muted-foreground">
                                    {comment.comments}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 justify-start mt-4">
                                    {
                                        comment.rating_values.map((category: any) => (
                                            <div className="flex flex-col items-center justify-center w-full h-auto p-2 bg-blue-50 rounded-xl">
                                                <Image src="https://img.icons8.com/?size=100&id=112791&format=png&color=000000" width={30} height={30} className="mx-auto" alt="User" />
                                                <p className="text-xs font-semibold text-gray-600 mt-2 text-nowrap">{category.rating_category.name_en}</p>
                                            </div>
                                        ))
                                    }
                                </div>

                                {/* <div className="flex items-center mt-4 space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Likes - 0</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-muted-foreground">Comments - 0</span>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                ) 
            : <p className="text-center text-red-600">There is no rating yet!</p>
            }
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>

        </>
    );
}

export default RatingComment;