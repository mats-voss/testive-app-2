import { Tag } from '../pages/Library/interfaces/tag.interface';
import { getAllWorksheets } from '../pages/WorksheetView/redux/worksheet.slice';
import { useAppSelector } from '../redux/reduxHooks';
import { TagCategory } from '../pages/Library/interfaces/TagCategory.enum';
import { useEffect, useState } from 'react';
import { getAllTagsByCategory } from '../pages/Library/redux/tags.slice';
import { LayoutAnimation } from 'react-native';

export function useRelatedSubjectTag(yearTag?: Tag): Tag[] {
  const worksheets = useAppSelector(getAllWorksheets);
  const allSubjectTags = useAppSelector((state) => getAllTagsByCategory(state, TagCategory.SUBJECT))
  const [subjectTags, setSubjectTags] = useState<Tag[]>([]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    if (!yearTag) {
      setSubjectTags(allSubjectTags)
      return
    }

    const newSubjectTagsSet = new Set<Tag>(
      worksheets
        .filter((worksheet) =>
          worksheet.tags?.some((filterTagId) => filterTagId === yearTag._id)
        )
        .flatMap((worksheet) =>
          allSubjectTags?.filter((tag) => worksheet.tags?.includes(tag._id!)) || []
        )
    );

    setSubjectTags(Array.from(newSubjectTagsSet));

  }, [yearTag, worksheets]);

  return subjectTags;
}
