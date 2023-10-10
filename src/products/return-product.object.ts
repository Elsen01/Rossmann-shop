import { Prisma } from "@prisma/client";
import { returnReviewObject } from "../reviews/return-review.object";
import { returnCategoryObject } from "../categories/return-category.object";

export const productReturnObject: Prisma.ProductSelect = {
  
  images: true,
  description: true,
  id: true,
  name: true,
  price: true,
  slug: true,
  createdAt: true
}
export const productReturnObjectFullest: Prisma.ProductSelect = {
  ...productReturnObject,
  reviews: {
    select: returnReviewObject
  },
  category: { select: returnCategoryObject}
}