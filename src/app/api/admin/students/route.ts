import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET all students
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const classId = searchParams.get('classId')
    const academicYear = searchParams.get('academicYear')

    const whereClause: any = {}
    if (classId) whereClause.classId = classId
    if (academicYear) whereClause.academicYear = academicYear

    const students = await db.student.findMany({
      where: whereClause,
      include: {
        class: true
      },
      orderBy: {
        rollNumber: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      students
    })

  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new student
export async function POST(request: NextRequest) {
  try {
    const { name, rollNumber, classId, academicYear } = await request.json()

    if (!name || !rollNumber || !classId || !academicYear) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if student already exists
    const existingStudent = await db.student.findFirst({
      where: {
        rollNumber,
        classId,
        academicYear
      }
    })

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Student with this roll number already exists in this class' },
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

    const student = await db.student.create({
      data: {
        name,
        rollNumber,
        classId,
        academicYear
      },
      include: {
        class: true
      }
    })

    return NextResponse.json({
      success: true,
      student
    })

  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}