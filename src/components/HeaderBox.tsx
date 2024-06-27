import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"

const HeaderBox = ({ type = "title", title, subtext, user, isButton, buttonTitle, variant, icon, buttonClassName, onClick }: HeaderBoxProps) => {
  return (
    <div className="flex w-full flex-row justify-between items-center">
      <div className="header-box">
        <h1 className="header-box-title">
          {title}
          {type === 'greeting' && (
            <span className="text-blue-800">
              &nbsp;{user}
            </span>
          )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
      </div>

      {
        isButton && (
          <div >
            <Button
              variant={variant}
              className={cn("",
                buttonClassName,
              )}
              onClick={onClick}
            >
              {icon}
              <span className="hidden md:inline-flex">{buttonTitle}</span>
            </Button>
          </div>
        )
      }

    </div>
  )
}

export default HeaderBox