import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all subjects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')

    const whereClause: any = {}
    if (classId) whereClause.classId = classId

    const subjects = await db.subject.findMany({
      where: whereClause,
      include: {
        class: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      subjects
    })

  } catch (error) {
    console.error('Error fetching subjects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new subject
export async function POST(request: NextRequest) {
  try {
    const { name, code, classId, maxMarks } = await request.json()

    if (!name || !classId) {
      return NextResponse.json(
        { error: 'Name and class ID are required' },
        { status: 400 }
      )
    }

    // Check if subject already exists in this class
    const existingSubject = await db.subject.findFirst({
      where: {
        name,
        classId
      }
    })

    if (existingSubject) {
      return NextResponse.json(
        { error: 'Subject already exists in this class' },
        { status: 400 }
      )
    }

    // Check if class exists
    const classExists = await db.class.findUnique({
      where: { id: classId }
    })

    if (!classExists) {
      return NextResponse.json(
        { error: 'Class not found' },
        { status: 404 }
      )
    }

    const subject = await db.subject.create({
      data: {
        name,
        code: code || null,
        classId,
        maxMarks: maxMarks || 100
      },
      include: {
        class: true
      }
    })

    return NextResponse.json({
      success: true,
      subject
    })

  } catch (error) {
    console.error('Error creating subject:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}