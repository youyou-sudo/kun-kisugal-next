'use client'

import React from 'react'
import { Button } from '@heroui/button'
import { Construction } from 'lucide-react'
import Link from 'next/link'

export default function TutorialPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* 开发图标 */}
      <Construction className="w-16 h-16 text-primary animate-bounce" />

      {/* 提示文字 */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">页面开发中</h1>
        <p className="text-default-500 mt-2">该功能正在完善，敬请期待...</p>
      </div>

      {/* 返回首页的按钮 */}
      <Button
        as={Link}
        href="/"
        variant="flat"
        color="primary"
        radius="full"
        className="mt-4"
      >
        返回首页
      </Button>
    </div>
  )
}
