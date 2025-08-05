import { db } from './db'

async function main() {
  // Create admin user
  const admin = await db.admin.create({
    data: {
      email: 'admin@school.com',
      password: 'admin123',
      name: 'School Admin'
    }
  })

  console.log('Admin created:', admin)

  // Create classes
  const class6 = await db.class.create({
    data: {
      name: '6',
      section: 'A',
      academicYear: '2024'
    }
  })

  const class7 = await db.class.create({
    data: {
      name: '7',
      section: 'A',
      academicYear: '2024'
    }
  })

  console.log('Classes created:', { class6, class7 })

  // Create subjects for class 6
  const subjects6 = await Promise.all([
    db.subject.create({
      data: {
        name: 'Bangla',
        code: 'BAN101',
        classId: class6.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'English',
        code: 'ENG101',
        classId: class6.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'Mathematics',
        code: 'MATH101',
        classId: class6.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'Science',
        code: 'SCI101',
        classId: class6.id,
        maxMarks: 100
      }
    })
  ])

  // Create subjects for class 7
  const subjects7 = await Promise.all([
    db.subject.create({
      data: {
        name: 'Bangla',
        code: 'BAN201',
        classId: class7.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'English',
        code: 'ENG201',
        classId: class7.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'Mathematics',
        code: 'MATH201',
        classId: class7.id,
        maxMarks: 100
      }
    }),
    db.subject.create({
      data: {
        name: 'Science',
        code: 'SCI201',
        classId: class7.id,
        maxMarks: 100
      }
    })
  ])

  console.log('Subjects created')

  // Create students for class 6
  const students6 = await Promise.all([
    db.student.create({
      data: {
        name: 'মোহাম্মদ আলী',
        rollNumber: '101',
        classId: class6.id,
        academicYear: '2024'
      }
    }),
    db.student.create({
      data: {
        name: 'ফাতেমা আক্তার',
        rollNumber: '102',
        classId: class6.id,
        academicYear: '2024'
      }
    }),
    db.student.create({
      data: {
        name: 'রহিম উদ্দিন',
        rollNumber: '103',
        classId: class6.id,
        academicYear: '2024'
      }
    })
  ])

  // Create students for class 7
  const students7 = await Promise.all([
    db.student.create({
      data: {
        name: 'আমিনা খাতুন',
        rollNumber: '201',
        classId: class7.id,
        academicYear: '2024'
      }
    }),
    db.student.create({
      data: {
        name: 'কামাল হোসেন',
        rollNumber: '202',
        classId: class7.id,
        academicYear: '2024'
      }
    })
  ])

  console.log('Students created')

  // Create results for class 6 students
  const results6 = await Promise.all([
    // Results for student 101
    db.result.create({
      data: {
        studentId: students6[0].id,
        subjectId: subjects6[0].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 85,
        grade: 'A+'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[0].id,
        subjectId: subjects6[1].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 78,
        grade: 'A'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[0].id,
        subjectId: subjects6[2].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 92,
        grade: 'A+'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[0].id,
        subjectId: subjects6[3].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 88,
        grade: 'A+'
      }
    }),
    // Results for student 102
    db.result.create({
      data: {
        studentId: students6[1].id,
        subjectId: subjects6[0].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 72,
        grade: 'A'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[1].id,
        subjectId: subjects6[1].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 68,
        grade: 'A-'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[1].id,
        subjectId: subjects6[2].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 75,
        grade: 'A'
      }
    }),
    db.result.create({
      data: {
        studentId: students6[1].id,
        subjectId: subjects6[3].id,
        classId: class6.id,
        semester: 1,
        year: '2024',
        marks: 70,
        grade: 'A'
      }
    })
  ])

  // Create results for class 7 students
  const results7 = await Promise.all([
    // Results for student 201
    db.result.create({
      data: {
        studentId: students7[0].id,
        subjectId: subjects7[0].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 82,
        grade: 'A+'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[0].id,
        subjectId: subjects7[1].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 76,
        grade: 'A'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[0].id,
        subjectId: subjects7[2].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 89,
        grade: 'A+'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[0].id,
        subjectId: subjects7[3].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 84,
        grade: 'A+'
      }
    }),
    // Results for student 202
    db.result.create({
      data: {
        studentId: students7[1].id,
        subjectId: subjects7[0].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 65,
        grade: 'A-'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[1].id,
        subjectId: subjects7[1].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 58,
        grade: 'B'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[1].id,
        subjectId: subjects7[2].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 62,
        grade: 'A-'
      }
    }),
    db.result.create({
      data: {
        studentId: students7[1].id,
        subjectId: subjects7[3].id,
        classId: class7.id,
        semester: 1,
        year: '2024',
        marks: 55,
        grade: 'B'
      }
    })
  ])

  console.log('Results created')
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })