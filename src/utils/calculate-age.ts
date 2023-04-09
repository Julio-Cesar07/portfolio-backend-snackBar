import dayjs from 'dayjs';

export function calculateAge(dateBirth: Date, dateNow?: Date){
	const age = dayjs(dateNow ?? new Date()).diff(
		dateBirth,
		'years'
	);

	return age;
}