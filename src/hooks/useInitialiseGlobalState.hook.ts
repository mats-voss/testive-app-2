import { useAuth0 } from 'react-native-auth0';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { fetchAllTags, getTagsStatus } from '../pages/Library/redux/tags.slice';
import {
  fetchSchoolClasses,
  getSchoolClassStatus,
} from '../pages/SchoolClassOverview/redux/schoolClass.slice';
import {
  fetchGradeSchemata,
  getGradeSchemataStatus,
} from '../pages/GradeSchema/redux/gradeSchema.slice';
import {
  fetchWorksheets,
  getWorksheetStatus,
} from '../pages/WorksheetView/redux/worksheet.slice';
import { EndpointStatus } from '../interfaces/endpointStatus.enum';
import { useEffect, useState } from 'react';

export function useInitialiseGlobalState() {
  const dispatch = useAppDispatch();
  const [splash, setSplash] = useState(true);
  const { user, error, isLoading } = useAuth0();

  const tagStateStatus = useAppSelector(getTagsStatus);
  const schoolClassStatus = useAppSelector(getSchoolClassStatus);
  const gradeSchemataStatus = useAppSelector(getGradeSchemataStatus);
  const worksheetStatus = useAppSelector(getWorksheetStatus);

  function checkRequiredStatesForStatus(
    statusToCheckWith: EndpointStatus,
  ): boolean {
    return [
      tagStateStatus,
      schoolClassStatus,
      gradeSchemataStatus,
      worksheetStatus,
    ].every((stateStatus) => stateStatus == statusToCheckWith);
  }

  useEffect(() => {
    /* TODO: FIX! The initial state gets not loaded when the user logs in for the first time! */

    // If the user is not logged in...
    if (!isLoading && !user) {
      setSplash(false);
    }

    // When an auth session is created and the state data should get fetched
    if (
      !isLoading &&
      user &&
      !error &&
      checkRequiredStatesForStatus(EndpointStatus.IDLE)
    ) {
      console.log('[App] Base-State fetched by root component');
      dispatch(fetchAllTags());
      dispatch(fetchSchoolClasses());
      dispatch(fetchGradeSchemata());
      dispatch(fetchWorksheets());
    }

    // When the state data got successful fetched
    if (
      !isLoading &&
      user &&
      !error &&
      checkRequiredStatesForStatus(EndpointStatus.SUCCEEDED)
    ) {
      setSplash(false);
      console.log('[App] Base-State correct');
    }
  }, [
    tagStateStatus,
    schoolClassStatus,
    gradeSchemataStatus,
    worksheetStatus,
    isLoading,
  ]);
  return splash;
}
