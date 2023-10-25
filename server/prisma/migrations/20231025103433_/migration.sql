-- CreateTable
CREATE TABLE "TimeLog" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "duration" TEXT,

    CONSTRAINT "TimeLog_pkey" PRIMARY KEY ("id")
);
