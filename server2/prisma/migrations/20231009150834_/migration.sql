-- CreateTable
CREATE TABLE "TimeLog" (
    "id" SERIAL NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "EndTime" TIMESTAMP(3),
    "duration" TEXT,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);
