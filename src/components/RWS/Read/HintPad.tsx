import { Textarea } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { Timeline, Text } from '@mantine/core';
import { IconGitBranch, IconGitPullRequest, IconGitCommit, IconMessageDots } from '@tabler/icons-react';


function HintPad() {


  return (
    <>
   <Timeline active={2} bulletSize={18} lineWidth={4}>

      <Timeline.Item  title="New branch">
      </Timeline.Item>

      <Timeline.Item  title="Commits">
      </Timeline.Item>
      
    </Timeline>
    </>
  );
}

export default HintPad;
