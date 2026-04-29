'use client'

import Link from 'next/link'
import { Gamepad2, Cherry, Diamond, SquareDashed } from 'lucide-react'

const emulators = [
  { name: 'KiriKiri', icon: Cherry, href: '#' },
  { name: 'ONS', icon: Gamepad2, href: '#' },
  { name: "Ren'Py", icon: Diamond, href: '#' },
  { name: 'Tyrano', icon: SquareDashed, href: '#' }
]

const tutorials = [
  { title: '如何安装模拟器', desc: '入门 · 5分钟', href: '#' },
  { title: '游戏导入教程', desc: '新手必看', href: '#' },
  { title: '报错解决', desc: '常见问题', href: '#' },
  { title: '补丁安装指南', desc: '进阶教程', href: '#' }
]

export default function TutorialPage() {
  return (
    <div className="w-full flex justify-center">
      {/* 居中容器 */}
      <div className="w-full max-w-5xl">
        {/* 标题 */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold">教程 & 模拟器</h1>
          <p className="text-gray-500 text-sm mt-1">
            为你提供实用的游戏工具与详细教程
          </p>
        </div>

        {/* ===== 模拟器 ===== */}
        <div>
          <h2 className="text-lg font-semibold mb-6">模拟器</h2>

          <div className="flex gap-10 flex-wrap">
            {emulators.map((emu) => {
              const Icon = emu.icon

              return (
                <Link key={emu.name} href={emu.href}>
                  <div className="flex flex-col items-center gap-3 group cursor-pointer">
                    {/* 图标（放大版） */}
                    <div
                      className="
                      w-20 h-20 rounded-2xl
                      bg-white border border-gray-200
                      shadow-sm
                      flex items-center justify-center
                      transition-all
                      group-hover:shadow-md
                      group-hover:-translate-y-1
                    "
                    >
                      <Icon className="w-8 h-8 text-pink-400" />
                    </div>

                    {/* 名字 */}
                    <span className="text-sm text-gray-600 group-hover:text-pink-500 transition">
                      {emu.name}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* ===== 分隔线 ===== */}
        <div className="my-10 border-t border-gray-200" />

        {/* ===== 教程 ===== */}
        <div>
          <h2 className="text-lg font-semibold mb-6">教程</h2>

          {/* 双栏 */}
          <div className="grid grid-cols-2 gap-5">
            {tutorials.map((item) => (
              <Link key={item.title} href={item.href}>
                <div
                  className="
                  p-4 rounded-xl border border-gray-200
                  bg-white
                  hover:shadow-md transition
                  cursor-pointer
                "
                >
                  <div className="font-medium mb-1">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
