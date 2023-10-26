import { IsOptional } from "class-validator";

export class PaymentDto {
  @IsOptional()
  amount: number
  
  @IsOptional()
  currency: string
  
  @IsOptional()
  type: string
}