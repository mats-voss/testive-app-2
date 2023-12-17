import { Tag } from '../pages/Library/interfaces/tag.interface';
import {
  WorksheetDTO
} from '../pages/WorksheetView/interface/worksheetDto.interface';
import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../redux/reduxHooks';
import { getAllWorksheets } from '../pages/WorksheetView/redux/worksheet.slice';
import { LayoutAnimation } from 'react-native';

export function useMatchWorksheetsToTagFilter(yearTag?: Tag, subjectTag?: Tag, themeTags?: Tag[]) {
  const worksheets = useAppSelector(getAllWorksheets);
  const [matchingWorksheets, setMatchingWorksheets] = useState<WorksheetDTO[]>([]);

  const memoizedThemeTags = useMemo(() => themeTags || [], [themeTags]);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const matching = worksheets?.filter((worksheet) => {
      const yearMatching = yearTag?._id ? worksheet.tags.includes(yearTag._id) : true;
      const subjectMatching = subjectTag?._id ? worksheet.tags.includes(subjectTag._id) : true;
      const themesMatching = !memoizedThemeTags.length || memoizedThemeTags.some((themeTag) => worksheet.tags.includes(themeTag._id!));

      return yearMatching && subjectMatching && themesMatching;
    }) || [];

    setMatchingWorksheets(matching);
  }, [yearTag, subjectTag, memoizedThemeTags, worksheets]);

  return matchingWorksheets;
}
