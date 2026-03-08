function shapeReminder(rawData: any) {
  const studentMap = new Map();

  rawData.forEach((item: any) => {
    const studentId = item.students.id;
    const studentName = item.students.name;
    const studentPhone = item.students.phone;
    const date = item.scheduled_jobs.scheduledFor;
    const hwSubject = item.homeworks.subject;
    const hwDesc = item.homeworks.description;
    const homeworkId = item.homeworks.id;

    if (!studentMap.has(studentId)) {
      studentMap.set(studentId, {
        studentId,
        name: studentName,
        phone: studentPhone,
        date,
        diary: [],
      });
    }

    const student = studentMap.get(studentId)!;

    // Add homework to diary
    student.diary.push({ hwId: homeworkId, [hwSubject]: hwDesc });
  });

  return Array.from(studentMap.values());
}
export { shapeReminder };
