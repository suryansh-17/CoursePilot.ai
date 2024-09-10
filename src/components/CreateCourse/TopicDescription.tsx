import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setTopic,
  setDescription,
} from "@/lib/store/features/userCourseInputSlice";
import useDebounce from "@/hooks/useDebouce";

const TopicDescription: React.FC = () => {
  const dispatch = useAppDispatch();
  const { topic, description } = useAppSelector(
    (state) => state.userCourseInput
  );

  // Local state for the input values
  const [localTopic, setLocalTopic] = useState(topic);
  const [localDescription, setLocalDescription] = useState(description);

  // Debounced values
  const debouncedTopic = useDebounce(localTopic, 300); // 300ms delay
  const debouncedDescription = useDebounce(localDescription, 300);

  // Effect to update topic in the Redux store after debouncing
  useEffect(() => {
    dispatch(setTopic(debouncedTopic));
  }, [debouncedTopic, dispatch]);

  // Effect to update description in the Redux store after debouncing
  useEffect(() => {
    dispatch(setDescription(debouncedDescription));
  }, [debouncedDescription, dispatch]);

  // Handlers to update local state immediately as user types
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTopic(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setLocalDescription(e.target.value);
  };

  return (
    <div className="mx-20 lg:mx-44">
      {/* Input for topic */}
      <div className="mt-5">
        <label>Write the topic for which you want to generate a course</label>
        <Input
          placeholder="Enter topic"
          value={localTopic}
          onChange={handleTopicChange}
        />
      </div>
      {/* Textarea for description */}
      <div>
        <label>Tell us more</label>
        <Textarea
          placeholder="Enter description"
          value={localDescription}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default TopicDescription;
