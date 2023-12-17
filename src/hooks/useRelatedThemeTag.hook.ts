import { Tag } from '../pages/Library/interfaces/tag.interface';
import { useAppSelector } from '../redux/reduxHooks';
import { getAllWorksheets } from '../pages/WorksheetView/redux/worksheet.slice';
import { useEffect, useState } from 'react';
import { TagCategory } from '../pages/Library/interfaces/TagCategory.enum';
import { getAllTagsByCategory } from '../pages/Library/redux/tags.slice';
import { LayoutAnimation } from 'react-native';
import {
  WorksheetDTO
} from '../pages/WorksheetView/interface/worksheetDto.interface';

export function useRelatedThemeTag(yearTag?: Tag, subjectTag?: Tag): Tag[] {
  const worksheets = useAppSelector(getAllWorksheets);
  const allThemeTags = useAppSelector((state) => getAllTagsByCategory(state, TagCategory.THEME))
  const [themeTags, setThemeTags] = useState<Tag[]>([]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!subjectTag && !yearTag) {
      setThemeTags(allThemeTags)
      return
    }

    const filterTags = (worksheet: WorksheetDTO) => {
      if (yearTag && subjectTag) {
        return worksheet.tags?.filter((filterTagId) => [yearTag._id, subjectTag._id].includes(filterTagId)).length === 2;
      } else if (yearTag) {
        return worksheet.tags?.some((filterTagId) => filterTagId === yearTag._id);
      } else if (subjectTag) {
        return worksheet.tags?.some((filterTagId) => filterTagId === subjectTag._id);
      }
      return false;
    };

    const newThemeTagsSet = new Set<Tag>(
      worksheets
        .filter((worksheet) => filterTags(worksheet))
        .flatMap((worksheet) => allThemeTags?.filter((tag) => worksheet.tags?.includes(tag._id!)) || [])
    );

    setThemeTags(Array.from(newThemeTagsSet));

  }, [yearTag, subjectTag, worksheets]);

  return themeTags;
}


