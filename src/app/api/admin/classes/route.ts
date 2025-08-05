import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all classes
export async function GET() {
  try {
    const classes = await db.class.findMany({
      include: {
        _count: {
          select: {
            students: true,
            subjects: true,
            results: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      classes
    })

  } catch (error) {
    console.error('Error fetching classes:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new class
export async function POST(request: NextRequest) {
  try {
    const { name, section, academicYear } = await request.json()

    if (!name || !academicYear) {
      return NextResponse.json(
        { error: 'Name and academic year are required' },
        { status: 400 }
      )
    }

    // Check if class already exists
    const existingClass = await db.class.findFirst({
      where: {
        name,
        section: section || null,
        academicYear
      }
    })

    if (existingClass) {
      return NextResponse.json(
        { error: 'Class already exists' },
        { status: 400 }
      )
    }

    const classData = await db.class.create({
      data: {
        name,
        section: section || null,
        academicYear
      }
    })

    return NextResponse.json({
      success: true,
      class: classData
    })

  } catch (error) {
    console.error('Error creating class:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}